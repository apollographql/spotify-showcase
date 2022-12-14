import { Outlet } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { isLoggedInVar } from '../vars';

const Root = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  console.log({ isLoggedIn });

  return <Outlet />;
};

export default Root;
