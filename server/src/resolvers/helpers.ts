import { OmitIndexSignature, ValueOf } from 'type-fest';
import { ContextValue } from '../types';
import { ResolversParentTypes, Resolver, ResolverFn } from './types';
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

export function wrap<TResult, TParent = {}, TArgs = {}>(
  resolver: ResolverFn<TResult, TParent, ContextValue, TArgs>
): Resolver<TResult, TParent, ContextValue, TArgs> {
  return async (parent, args, context, info) => {
    const { fieldConfig } = context;

    if (fieldConfig.timeout > 0) {
      await wait(fieldConfig.timeout);
    }

    return resolver(parent, args, context, info);
  };
}
