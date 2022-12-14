import { makeVar } from '@apollo/client';
import { readAuthToken } from './utils';

export const isLoggedInVar = makeVar(Boolean(readAuthToken()));
