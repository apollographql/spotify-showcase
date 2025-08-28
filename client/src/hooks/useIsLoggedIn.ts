import { useReactiveVar } from '@apollo/client/react';
import { isLoggedInVar } from '../vars';

const useIsLoggedIn = () => useReactiveVar(isLoggedInVar);

export default useIsLoggedIn;
