import SpotifyAPI from './dataSources/spotify';
import { GraphQLFieldResolver } from 'graphql';

export interface ContextValue {
  dataSources: {
    spotify: SpotifyAPI;
  };
}

export type GraphQLObjectResolver<
  TSource = any,
  TArgs = any,
  TResult = unknown
> = Record<string, GraphQLFieldResolver<TSource, ContextValue, TArgs, TResult>>;
