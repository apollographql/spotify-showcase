import { UserResolvers } from '../__generated__/resolvers-types';
import { prop } from './helpers';

export const User: UserResolvers = {
  displayName: prop('display_name'),
  externalUrls: prop('external_urls'),
  __resolveReference: (user, { dataSources }) => {
    return dataSources.spotify.getUser(user.id);
  },
};
