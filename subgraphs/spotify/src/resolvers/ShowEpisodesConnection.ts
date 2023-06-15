import { ShowEpisodesConnectionResolvers } from '../__generated__/resolvers-types';
import { itself, prop } from './helpers';

export const ShowEpisodesConnection: ShowEpisodesConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};