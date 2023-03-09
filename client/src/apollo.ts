import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
  split,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { setContext } from '@apollo/client/link/context';
import { readAuthToken } from './utils';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import introspection from './introspection.json';
import libraryContains from './fieldPolicies/libraryContains';
import offsetConnectionPagination from './fieldPolicies/offsetConnectionPagination';
import cursorConnectionPagination from './fieldPolicies/cursorConnectionPagination';

const httpLink = createHttpLink({ uri: '/graphql' });

const authHeadersLink = setContext(() => ({
  headers: { 'x-api-token': readAuthToken() },
}));

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${import.meta.env.VITE_WEBSOCKET_HOST}/graphql`,
    connectionParams: {
      get apiToken() {
        return readAuthToken();
      },
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  ApolloLink.from([authHeadersLink, httpLink])
);

export default new ApolloClient({
  link: splitLink,
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
