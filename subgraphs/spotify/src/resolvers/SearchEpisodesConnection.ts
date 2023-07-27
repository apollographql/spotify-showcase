import { SearchEpisodesConnectionResolvers } from '../__generated__/resolvers-types';
import { itself, prop } from './helpers';

export const SearchEpisodesConnection: SearchEpisodesConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};
