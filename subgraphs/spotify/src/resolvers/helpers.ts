import { OmitIndexSignature, ValueOf } from 'type-fest';
import {
  ResolversParentTypes,
  Resolver,
} from '../__generated__/resolvers-types';

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
