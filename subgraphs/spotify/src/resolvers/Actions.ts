import { Action, ActionsResolvers } from '../__generated__/resolvers-types';

export const Actions: ActionsResolvers = {
  disallows: (actions) => {
    return Object.keys(actions.disallows) as Action[];
  },
};

