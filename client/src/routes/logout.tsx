import { LoaderFunction, redirect } from 'react-router-dom';
import { logout } from '../auth';

export const loader: LoaderFunction = async () => {
  await logout();
  return redirect('/');
};
