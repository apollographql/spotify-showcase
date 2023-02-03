import { UserResolvers } from './types';
import { prop } from './helpers';

const resolvers: UserResolvers = {
  displayName: prop('display_name'),
  externalUrls: prop('external_urls'),
  __resolveReference: (user, { dataSources }) => {
    return dataSources.spotify.getUser(user.id);
  },
};

export default resolvers;
