import { useEffect, useState } from 'react';
import { TypedDocumentNode, gql, useSuspenseQuery } from '@apollo/client';
import { AuthTokenQuery } from './types/api';
import useScript from './hooks/useScript';

const AUTH_TOKEN_QUERY: TypedDocumentNode<AuthTokenQuery> = gql`
  query AuthTokenQuery {
    me {
      auth @client {
        accessToken
      }
    }
  }
`;

const SpotifyConnect = () => {
  useScript('https://sdk.scdn.co/spotify-player.js', { async: true });
  const [ready, setReady] = useState(false);

  const {
    client,
    data: { me: currentUser },
  } = useSuspenseQuery(AUTH_TOKEN_QUERY);

  const token = currentUser?.auth.accessToken;

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || !token) {
      return;
    }

    const player = new window.Spotify.Player({
      name: 'Apollo Spotify Showcase',
      getOAuthToken: (cb) => cb(token),
    });

    player.addListener('ready', () => {
      const { cache } = client;
      cache.modify({
        id: cache.identify({ __typename: 'Player' }),
        fields: {
          devices: (_, { DELETE }) => DELETE,
        },
      });
    });
    player.connect();

    return () => {
      player.disconnect();
    };
  }, [client, ready, token]);

  return null;
};

export default SpotifyConnect;
