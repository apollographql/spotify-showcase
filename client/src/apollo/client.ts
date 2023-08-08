import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  createHttpLink,
  from,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import {
  generatePersistedQueryIdsFromManifest,
  createPersistedQueryManifestVerificationLink,
  PersistedQueryManifestForVerification,
} from '@apollo/persisted-query-lists';
import introspection from './introspection.json';
import libraryContains from '../fieldPolicies/libraryContains';
import offsetConnectionPagination from '../fieldPolicies/offsetConnectionPagination';
import cursorConnectionPagination from '../fieldPolicies/cursorConnectionPagination';
import { getAccessToken } from '../auth';
import { version } from '../../package.json';
import { persistedQueryModeVar } from '../vars';
import { fragmentRegistry } from './fragmentRegistry';
import { resolvers } from './resolvers';

let persistedQueriesImport: Promise<PersistedQueryManifestForVerification>;

function loadManifest() {
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

const persistedQuerylink = createPersistedQueryLink({
  ...generatePersistedQueryIdsFromManifest({ loadManifest }),
  disable: () => false,
});

const persistedQueries = split(
  () => persistedQueryModeVar(),
  from([
    // TODO: Figure out why there is a type mismatch
    persistedQueryVerificationLink as unknown as ApolloLink,
    persistedQuerylink,
  ])
);

const httpAuthLink = setContext(async ({ context }) => {
  const accessToken = await getAccessToken();

  return {
    headers: {
      ...context?.headers,
      authorization: accessToken,
    },
  };
});

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_SERVER_HOST,
});

export default new ApolloClient({
  link: from([httpAuthLink, persistedQueries, httpLink]),
  connectToDevTools: true,
  name: 'Spotify Showcase Website',
  resolvers,
  version,
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
      CurrentUserProfile: {
        keyFields: [],
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
});
