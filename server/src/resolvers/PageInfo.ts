import { PageInfoResolvers } from './types';

const resolvers: PageInfoResolvers = {
  hasNextPage: (paginated) => Boolean(paginated.next),
  hasPreviousPage: (paginated) => Boolean(paginated.previous),
};

export default resolvers;
