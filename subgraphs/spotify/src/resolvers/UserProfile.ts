import { UserProfileResolvers } from '../__generated__/resolvers-types';

export const UserProfile: UserProfileResolvers = {
  __resolveType: (profile) => {
    if ('email' in profile) {
      return 'CurrentUserProfile';
    }

    return 'User';
  },
};
