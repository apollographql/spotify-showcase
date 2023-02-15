import { LoaderFunction, redirect } from 'react-router-dom';
import { LOGIN_URL } from '../constants';

export const loader: LoaderFunction = () => redirect(LOGIN_URL);
