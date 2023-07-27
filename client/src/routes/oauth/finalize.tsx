import { LoaderFunction, redirect } from 'react-router-dom';
import { STORAGE_KEYS } from '../../constants';
import { login } from '../../auth';
import { exchangeToken } from '../../utils/oauth';

export const loader: LoaderFunction = async ({ request }) => {
  const state = localStorage.getItem(STORAGE_KEYS.STATE);
  const codeVerifier = localStorage.getItem(STORAGE_KEYS.CODE_VERIFIER);
  const params = new URL(request.url).searchParams;
  const code = params.get('code');

  if (
    params.has('error') ||
    params.get('state') !== state ||
    !code ||
    !codeVerifier
  ) {
    throw new Response('Not authorized', { status: 401 });
  }

  const data = await exchangeToken(code);

  login(data);

  localStorage.removeItem(STORAGE_KEYS.STATE);
  localStorage.removeItem(STORAGE_KEYS.CODE_VERIFIER);

  return redirect('/');
};
