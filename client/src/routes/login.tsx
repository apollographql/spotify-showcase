import { redirect } from 'react-router-dom';
import { OAUTH_SCOPES, STORAGE_KEYS } from '../constants';
import { generateCodeVerifier, generateCodeChallenge } from '../utils/oauth';
import generateRandomString from '../utils/generateRandomString';

export const loader = async () => {
  const url = new URL('https://accounts.spotify.com/authorize');
  const state = generateRandomString(16);
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  localStorage.setItem(STORAGE_KEYS.STATE, state);
  localStorage.setItem(STORAGE_KEYS.CODE_VERIFIER, codeVerifier);

  url.search = new URLSearchParams({
    response_type: 'code',
    client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    scope: OAUTH_SCOPES.join(' '),
    redirect_uri: new URL('/oauth/finalize', location.origin).toString(),
    state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  }).toString();

  return redirect(url.toString());
};
