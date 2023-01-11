import { SubscriptionResolvers } from './types';
import { pollPlaybackState } from '../utils/spotify';
import camelize from 'camelize';
import { TOPICS } from '../constants';
import { map, distinctUntilChanged } from 'rxjs';
import { equal } from '@wry/equality';
import { getSelectionsMap, FieldSelections } from '../utils/graphql';
import { isPlainObject } from '../utils/common';

const resolvers: SubscriptionResolvers = {
  playbackStateChanged: {
    subscribe: async (_, __, { pubsub, dataSources }, info) => {
      const selections = getSelectionsMap(
        info.fieldNodes[0].selectionSet,
        info.fragments
      );

      const subscription = pollPlaybackState(dataSources.spotify)
        .pipe(
          map(
            (playbackState) =>
              playbackState && pickSelectedFields(playbackState, selections)
          ),
          distinctUntilChanged((prev, curr) => equal(prev, curr))
        )
        .subscribe((playbackState) => {
          pubsub.publish(TOPICS.PLAYBACK_STATE_CHANGED, {
            playbackStateChanged: playbackState,
          });
        });

      pubsub.subscribe(TOPICS.DISCONNECT, () => {
        subscription.unsubscribe();
      });

      return pubsub.asyncIterator(TOPICS.PLAYBACK_STATE_CHANGED) as any;
    },
  },
};

const ALWAYS_KEPT_FIELDS = ['type'];

// Return a partial representation of the object based on the selection set.
// This allows us to more easily detect if the playback has changed only for the
// fields that we care about
const pickSelectedFields = <T extends object>(
  object: T,
  selections: FieldSelections
): Partial<T> => {
  const map = Object.entries(object).reduce((map, [key, value]) => {
    const camelizedKey = camelize(key);

    if (ALWAYS_KEPT_FIELDS.includes(key)) {
      return map.set(key, value);
    }

    if (!selections.has(camelizedKey)) {
      return map;
    }

    if (isPlainObject(value)) {
      return map.set(
        key,
        pickSelectedFields(
          value,
          selections.get(camelizedKey) as FieldSelections
        )
      );
    }

    if (Array.isArray(value)) {
      return map.set(
        key,
        value.map((item) =>
          pickSelectedFields(
            item,
            selections.get(camelizedKey) as FieldSelections
          )
        )
      );
    }

    return map.set(key, value);
  }, new Map());

  return Object.fromEntries(map.entries());
};

export default resolvers;
