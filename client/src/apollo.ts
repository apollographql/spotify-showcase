import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import introspection from './introspection.json';
import libraryContains from './fieldPolicies/libraryContains';
import offsetConnectionPagination from './fieldPolicies/offsetConnectionPagination';
import cursorConnectionPagination from './fieldPolicies/cursorConnectionPagination';
import { getAccessToken } from './auth';
import { version } from "../package.json";


const httpAuthLink = setContext(async ({ context }) => {
  const accessToken = await getAccessToken();

  return {
    headers: {
      ...context?.headers,
      'authorization': accessToken,
    },
  };
});

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_SERVER_HOST
});

export default new ApolloClient({
  link: from([httpAuthLink, httpLink]),
  connectToDevTools: true,
  name: "Spotify Showcase Website",
  version,
  cache: new InMemoryCache({
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
          albums: offsetConnectionPagination(),
          albumsContains: libraryContains(),
          // TODO: Figure out why this doesn't work when using with fragment
          // episodes: offsetConnectionPagination(),
          episodesContains: libraryContains(),
          followedArtists: cursorConnectionPagination(),
          showsContains: libraryContains(),
          playlists: offsetConnectionPagination(['@connection', ['key']]),
          tracksContains: libraryContains(),
          tracks: offsetConnectionPagination(),
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
          tracks: offsetConnectionPagination(),
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
