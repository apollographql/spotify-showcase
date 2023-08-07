import { Outlet } from 'react-router-dom';
import StandardLoadingState from '../StandardLoadingState';

export const Route = () => {
  return <Outlet />;
};

Route.LoadingState = StandardLoadingState;
