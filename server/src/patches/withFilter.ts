import { GraphQLResolveInfo } from 'graphql';
import { withFilter as withFilterOriginal } from 'graphql-subscriptions';

type FilterFn<TParent = {}, TContext = {}, TArgs = {}> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

// https://github.com/apollographql/graphql-subscriptions/issues/261#issuecomment-1246300357
export const withFilter = withFilterOriginal as unknown as <
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
>(
  asyncIteratorFn: ResolverFn<TResult, TParent, TContext, TArgs>,
  filterFn: FilterFn<TParent, TContext, TArgs>
) => ResolverFn<TResult, TParent, TContext, TArgs>;
