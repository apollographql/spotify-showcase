import { Outlet } from 'react-router-dom';
import PlaybackStateSubscriber from '../components/PlaybackStateSubscriber';

const AuthenticatedRoute = () => {
  return (
    <>
      <PlaybackStateSubscriber />
      <Outlet />
    </>
  );
};

export default AuthenticatedRoute;
