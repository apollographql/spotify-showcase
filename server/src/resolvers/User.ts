import { UserResolvers } from './types';
import { prop } from './helpers';

const resolvers: UserResolvers = {
  displayName: prop('display_name'),
  externalUrls: prop('external_urls'),
};

export default resolvers;
