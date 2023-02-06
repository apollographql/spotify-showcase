import { UserResolvers } from './types';
import { prop } from './helpers';

const resolvers: UserResolvers = {
  displayName: prop('display_name'),
  externalUrls: prop('external_urls'),
  // TODO: Add back when @apollo/subgraph adds subscription support
  // https://github.com/apollographql/graphos-subscriptions/issues/123
  // __resolveReference: (user, { dataSources }) => {
  //   return dataSources.spotify.getUser(user.id);
  // },
};

export default resolvers;
