import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  split,
  ApolloLink,
  from,
  FetchResult,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition, Observable } from '@apollo/client/utilities';
import introspection from './introspection.json';
import libraryContains from './fieldPolicies/libraryContains';
import offsetConnectionPagination from './fieldPolicies/offsetConnectionPagination';
import cursorConnectionPagination from './fieldPolicies/cursorConnectionPagination';
import { Subscription } from 'zen-observable-ts';
import { GraphQLError } from 'graphql';

const httpLink = createHttpLink({ uri: '/graphql' });

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${import.meta.env.VITE_WEBSOCKET_HOST}/graphql`,
  })
);

let isReauthenticating: Promise<void> | undefined;
const reauthenticateLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let running = true;
      let subscription: Subscription | undefined;

      async function request() {
        if (isReauthenticating) {
          // another query is already in the progress of reauthenticating
          try {
            // wait for it
            await isReauthenticating;
          } catch (unauthenticatedError) {
            // it failed to get a new token => directly fail without even making this request
            // to discuss: is this always a valid shortcut, or do we have requests that are fine unauthenticated?
            observer.next({ errors: [unauthenticatedError as GraphQLError] });
            observer.complete();
            return;
          }
        }
        // if the whole shebang hasn't been cancelled until now
        if (!running) return;
        // start the normal request
        subscription = forward(operation).subscribe({
          next(value) {
            const unauthenticatedError = value.errors?.find(
              (e) => e.message == 'Invalid access token'
            );
            if (unauthenticatedError) {
              onUnauthenticated(value, unauthenticatedError);
            } else {
              observer.next(value);
            }
          },
          error: (err) => observer.error(err),
          complete: () => observer.complete(),
        });
      }

      async function onUnauthenticated(
        result: FetchResult,
        unauthenticatedError: GraphQLError
      ) {
        subscription?.unsubscribe();
        subscription = undefined;

        // if no other query is already in the process of reauthenticating
        if (!isReauthenticating) {
          // we try
          isReauthenticating = reauthenticate(unauthenticatedError);
        }

        try {
          // either way, we wait until that is finished
          await isReauthenticating;
        } catch {
          // if it failed, `.next` our original, failed response
          observer.next(result);
          // and `.complete` since we already unsubscribed the original observable
          observer.complete();
          return;
        }

        // if the reauthentication finished successfully, we try it once more
        if (running) finalRetry();
      }

      async function reauthenticate(originalError: GraphQLError) {
        const response = await fetch('/oauth/refresh_token');
        if (!response.ok) throw originalError;
      }

      function finalRetry() {
        subscription = forward(operation).subscribe({
          next: (value) => observer.next(value),
          error: (err) => observer.error(err),
          complete: () => observer.complete(),
        });
      }

      request();

      return () => {
        running = false;
        subscription?.unsubscribe();
      };
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
  from([reauthenticateLink, httpLink])
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
