import { randomBetween } from './common';
import generateRandomString from './generateRandomString';
import { readToken } from '../auth';
import { STORAGE_KEYS } from '../constants';

export interface AccessTokenResponse {
  access_token: string;
  token_type: 'Bearer';
  refresh_token: string;
  expires_in: number;
  scope: string;
}

export interface RefreshAccessTokenResponse {
  access_token: string;
  token_type: 'Bearer';
  scope: string;
  expires_in: number;
}

const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';

//  https://www.rfc-editor.org/rfc/rfc7636#section-4.1
export const generateCodeVerifier = () => {
  return generateRandomString(randomBetween(43, 128));
};

// https://www.rfc-editor.org/rfc/rfc7636#section-4.2
export const generateCodeChallenge = async (codeVerifier: string) => {
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(codeVerifier)
  );

  return window
    .btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

export const exchangeToken = async (
  code: string
): Promise<AccessTokenResponse> => {
  const codeVerifier = localStorage.getItem(STORAGE_KEYS.CODE_VERIFIER);

  if (!codeVerifier) {
    throw new Error('code_verifier must exist');
  }

  const res = await fetch(SPOTIFY_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code,
      client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
      code_verifier: codeVerifier,
      grant_type: 'authorization_code',
      redirect_uri: new URL('/oauth/finalize', location.origin).toString(),
    }),
  });

  if (!res.ok) {
    throw new Error('Not authorized');
  }

  return res.json();
};

export const refreshAccessToken =
  async (): Promise<RefreshAccessTokenResponse> => {
    const refreshToken = readToken('refresh');

    if (!refreshToken) {
      throw new Error('No refresh token present');
    }

    const res = await fetch(SPOTIFY_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    if (!res.ok) {
      throw new Error('Not authorized');
    }

    return res.json();
  };
