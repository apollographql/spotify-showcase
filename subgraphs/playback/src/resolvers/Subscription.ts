import { SubscriptionResolvers } from '../__generated__/resolvers-types';
import { Spotify } from '../dataSources/spotify.types';
import { catchError, map, distinctUntilChanged, of } from 'rxjs';
import { equal } from '@wry/equality';
import { GraphQLResolveInfo } from 'graphql';
import { omit } from 'lodash';
import { PartialDeep } from 'type-fest';
import { selectsField } from '../utils/graphql';
import { createPlaybackStateObservable } from '../observables';
import { eachValueFrom } from 'rxjs-for-await';

type PlaybackStateChangedPayload =
  | { data: { playbackStateChanged: Spotify.Object.PlaybackState | null } }
  | { error: Error };

export const Subscription: SubscriptionResolvers = {
  playbackStateChanged: {
    resolve: (payload: PlaybackStateChangedPayload) => {
      if ('error' in payload) {
        throw payload.error;
      }

      return payload.data.playbackStateChanged;
    },
    subscribe: async (_, __, { dataSources }, info) => {
      const source$ = createPlaybackStateObservable(dataSources.spotify).pipe(
        map((playbackState) => {
          if (!playbackState) {
            return null;
          }

          return maybeOmitVolatileFields(
            playbackState,
            info
          ) as Spotify.Object.PlaybackState;
        }),
        distinctUntilChanged((prev, curr) => equal(prev, curr)),
        map((result) => ({
          data: {
            playbackStateChanged: result && {
              ...result,
              timestamp: Date.now(),
            },
          },
        })),
        catchError((error) => of({ error }))
      );

      return eachValueFrom(source$);
    },
  },
};

type Operation = (
  playbackState: PartialDeep<Spotify.Object.PlaybackState>,
  info: GraphQLResolveInfo
) => PartialDeep<Spotify.Object.PlaybackState>;

const operations: Operation[] = [
  (playbackState) => ({
    ...playbackState,
    item: omit(playbackState.item, 'available_markets'),
  }),
  (playbackState) => {
    const playbackItem = playbackState.item;
    const updatedItem =
      playbackItem?.type === 'track'
        ? omit(playbackItem, ['album.available_markets'])
        : playbackItem;

    return {
      ...playbackState,
      item: updatedItem,
    };
  },
  (playbackState) => ({
    ...playbackState,
    item: equal(playbackState.item, {}) ? null : playbackState.item,
  }),
  (playbackState, info) =>
    selectsField(['playbackStateChanged', 'timestamp'], info)
      ? playbackState
      : omit(playbackState, ['timestamp']),
  (playbackState, info) =>
    selectsField(['playbackStateChanged', 'progressMs'], info)
      ? playbackState
      : omit(playbackState, ['progress_ms']),
];

// Return a partial representation of the object with volatile fields removed.
// Volatile fields are fields that change often that make it difficult to detect
// when the playback state has changed. By removing volatile fields, this allows
// us to more easily detect if the playback has changed only for the
// fields that we care about, ensuring we publish on the topic less often than
// needed.
const maybeOmitVolatileFields = (
  playbackState: Spotify.Object.PlaybackState,
  info: GraphQLResolveInfo
): PartialDeep<Spotify.Object.PlaybackState> => {
  return operations.reduce((playbackState, operation) => {
    return operation(playbackState, info);
  }, playbackState as PartialDeep<Spotify.Object.PlaybackState>);
};
