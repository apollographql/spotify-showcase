import { PageInfoResolvers } from '../__generated__/resolvers-types';

export const PageInfo: PageInfoResolvers = {
  hasNextPage: (paginated) => Boolean(paginated.next),
  hasPreviousPage: (paginated) => Boolean(paginated.previous),
};
