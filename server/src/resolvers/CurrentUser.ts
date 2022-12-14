import camelize from 'camelize';
import { CurrentUserResolvers } from './types';

const resolvers: CurrentUserResolvers = {
  user: (currentUser) => camelize(currentUser),
};

export default resolvers;
