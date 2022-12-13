import SpotifyAPI from './dataSources/spotify';
import { GraphQLFieldResolver } from 'graphql';

export interface ContextValue {
  dataSources: {
    spotify: SpotifyAPI;
  };
}

export type Resolver<
  TSource = any,
  TArgs = unknown,
  TResult = any
> = GraphQLFieldResolver<TSource, ContextValue, TArgs, TResult>;
