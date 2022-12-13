declare namespace Spotify {
  export type Response = {
    '/authorize':
      | { code: string; state?: string }
      | { error: string; state?: string };

    '/api/token': {
      access_token: string;
      expires_in: number;
      refresh_token: string;
      scope: string;
      token_type: 'Bearer';
    };
  };
}
