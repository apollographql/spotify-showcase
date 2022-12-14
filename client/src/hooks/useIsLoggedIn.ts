import { useReactiveVar } from '@apollo/client';
import { isLoggedInVar } from '../vars';

const useIsLoggedIn = () => useReactiveVar(isLoggedInVar);

export default useIsLoggedIn;
