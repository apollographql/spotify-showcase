import SpotifyAPI from './dataSources/spotify';
import { GraphQLFieldResolver } from 'graphql';

export interface ContextValue {
  dataSources: {
    spotify: SpotifyAPI;
  };
}

export type GraphQLObjectResolver = Record<
  string,
  GraphQLFieldResolver<unknown, ContextValue, any, any>
>;
