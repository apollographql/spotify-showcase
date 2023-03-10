import { LoaderFunction, redirect } from 'react-router-dom';
import { login } from '../auth';

export const loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');

  if (token) {
    login(token);
  }

  // if we are a popup window, this will close it, otherwise it will do nothing.
  window.close();
  return redirect('/');
};
