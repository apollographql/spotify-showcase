import { OmitIndexSignature, ValueOf } from 'type-fest';
import { GraphQLError } from 'graphql';
import { ContextValue } from '../types/ContextValue';
import {
  ResolversParentTypes,
  Resolver,
  ResolverFn,
} from '../__generated__/resolvers-types';
import { getFieldConfig, identify } from '../fieldConfigs';
import { wait } from '../utils/common';

type ParentTypes = ValueOf<OmitIndexSignature<ResolversParentTypes>>;

export function prop<TParent extends ParentTypes, TKey extends keyof TParent>(
  key: TKey
): Resolver<TParent[TKey], TParent> {
  return (parent: TParent) => parent[key];
}

export function itself<TParent extends ParentTypes>(): Resolver<
  TParent,
  TParent
> {
  return (parent: TParent) => parent;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function wrapWithSynthetics<TResult, TParent = {}, TArgs = {}>(
  resolver: ResolverFn<TResult, TParent, ContextValue, TArgs>
): Resolver<TResult, TParent, ContextValue, TArgs> {
  return async (parent, args, context, info) => {
    const fieldConfig = getFieldConfig(identify.fromResolverInfo(info));
    const { config } = fieldConfig;

    if (config.timeout > 0) {
      await wait(config.timeout);
    }

    if (Math.random() < config.errorRate) {
      throw new GraphQLError("You've been hit by a synthetic error!", {
        extensions: { code: 'SYNTHETIC_ERROR' },
      });
    }

    return resolver(parent, args, context, info);
  };
}
