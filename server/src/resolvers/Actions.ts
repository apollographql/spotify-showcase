import { Action, ActionsResolvers } from './types';

const resolvers: ActionsResolvers = {
  disallows: (actions) => {
    return Object.keys(actions.disallows) as Action[];
  },
};

export default resolvers;
