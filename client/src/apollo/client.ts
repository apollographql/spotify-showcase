import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { Defer20220824Handler } from '@apollo/client/incremental';
import { SetContextLink } from '@apollo/client/link/context';
import { PersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { LocalState } from '@apollo/client/local-state';
import { createQueryPreloader } from '@apollo/client/react';
import {
  createPersistedQueryManifestVerificationLink,
  generatePersistedQueryIdsFromManifest,
  PersistedQueryManifestForVerification,
} from '@apollo/persisted-query-lists';
import { version } from '../../package.json';
import { getAccessToken } from '../auth';
import cursorConnectionPagination from '../fieldPolicies/cursorConnectionPagination';
import libraryContains from '../fieldPolicies/libraryContains';
import offsetConnectionPagination from '../fieldPolicies/offsetConnectionPagination';
import { persistedQueryModeVar } from '../vars';
import { Resolvers } from './__generated__/local-resolvers';
import { fragmentRegistry } from './fragmentRegistry';
import introspection from './introspection.json';
import { resolvers } from './resolvers';

let persistedQueriesImport: Promise<PersistedQueryManifestForVerification>;

function loadManifest() {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  if (!persistedQueriesImport) {
    persistedQueriesImport = import(
      './persisted-query-manifest.json'
    ) as Promise<PersistedQueryManifestForVerification>;
  }

  return persistedQueriesImport;
}

const persistedQueryVerificationLink =
  createPersistedQueryManifestVerificationLink({
    loadManifest,
    onVerificationFailed: (details) => {
      console.warn(details.reason, details.operation.query);
    },
  });

const persistedQuerylink = new PersistedQueryLink({
  ...generatePersistedQueryIdsFromManifest({ loadManifest }),
  disable: () => false,
});

const persistedQueries = ApolloLink.split(
  () => persistedQueryModeVar(),
  ApolloLink.from([
    // TODO: Figure out why there is a type mismatch
    persistedQueryVerificationLink as unknown as ApolloLink,
    persistedQuerylink,
  ])
);

const httpAuthLink = new SetContextLink(async (context) => {
  const accessToken = await getAccessToken();

  return {
    headers: {
      ...context.headers,
      authorization: accessToken,
    },
  };
});

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_SERVER_HOST,
});

const client = new ApolloClient({
  link: ApolloLink.from([httpAuthLink, persistedQueries, httpLink]),
  cache: new InMemoryCache({
    fragments: fragmentRegistry,
    possibleTypes: introspection.possibleTypes,
    typePolicies: {
      Album: {
        fields: {
          releaseDate: {
            merge: true,
          },
        },
      },
      Copyright: {
        keyFields: false,
      },
      CurrentUser: {
        keyFields: [],
        fields: {
          albums: offsetConnectionPagination('SavedAlbumsConnection'),
          albumsContains: libraryContains(),
          // TODO: Figure out why this doesn't work when using with fragment
          // episodes: offsetConnectionPagination(),
          episodesContains: libraryContains(),
          followedArtists: cursorConnectionPagination(),
          showsContains: libraryContains(),
          playlists: offsetConnectionPagination('PlaylistConnection', [
            '@connection',
            ['key'],
          ]),
          tracksContains: libraryContains(),
          tracks: offsetConnectionPagination('SavedTracksConnection'),
        },
      },
      Developer: {
        keyFields: [],
      },
      FieldConfig: {
        keyFields: ['schemaField', ['fieldName', 'typename']],
      },
      Followers: {
        keyFields: false,
      },
      Image: {
        keyFields: ['url'],
      },
      Player: {
        keyFields: [],
        fields: {
          playbackState: {
            merge: (existing, incoming, { cache, mergeObjects }) => {
              if (incoming === null) {
                cache.evict({
                  id: cache.identify({ __typename: 'PlaybackState' }),
                });
                cache.gc();

                return null;
              }

              return mergeObjects(existing, incoming);
            },
          },
        },
      },
      PlaybackQueue: {
        keyFields: [],
        merge: true,
      },
      PlaybackState: {
        keyFields: [],
        merge: true,
      },
      Playlist: {
        fields: {
          tracks: offsetConnectionPagination('PlaylistTrackConnection'),
        },
      },
      Query: {
        fields: {
          me: {
            merge: true,
          },
        },
      },
      ReleaseDate: {
        keyFields: false,
      },
      SavedTrackEdge: {
        keyFields: [['node', ['id']]],
      },
    },
  }),
  clientAwareness: {
    name: 'Spotify Showcase Website',
    version,
  },
  localState: new LocalState<Resolvers>({
    resolvers,
  }),
  devtools: {
    enabled: true,
  },
  incrementalHandler: new Defer20220824Handler(),
});

export const preloadQuery = createQueryPreloader(client);

export default client;
