import { CurrentUserProfileResolvers } from '../__generated__/resolvers-types';
import { prop } from './helpers';

export const CurrentUserProfile: CurrentUserProfileResolvers = {
  displayName: prop('display_name'),
  explicitContent: prop('explicit_content'),
};
