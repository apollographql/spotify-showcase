import { LoaderFunction, redirect } from 'react-router-dom';
import { STORAGE_KEYS } from '../../constants';
import { login } from '../../auth';

export const loader: LoaderFunction = async ({ request }) => {
  const state = localStorage.getItem(STORAGE_KEYS.STATE);
  const codeVerifier = localStorage.getItem(STORAGE_KEYS.CODE_VERIFIER);
  const params = new URL(request.url).searchParams;
  const code = params.get('code');

  localStorage.removeItem(STORAGE_KEYS.STATE);
  localStorage.removeItem(STORAGE_KEYS.CODE_VERIFIER);

  if (
    params.has('error') ||
    params.get('state') !== state ||
    !code ||
    !codeVerifier
  ) {
    throw new Response('Not authorized', { status: 401 });
  }

  const body = new URLSearchParams({
    code,
    client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    grant_type: 'authorization_code',
    redirect_uri: new URL('/oauth/finalize', location.origin).toString(),
    code_verifier: codeVerifier,
  });

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  if (!res.ok) {
    throw new Response('Something went wrong', { status: 500 });
  }

  const data = await res.json();

  login(data);

  return redirect('/');
};
