import { randomBetween } from './common';
import generateRandomString from './generateRandomString';

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
