import { useEffect } from 'react';
import { STORAGE_KEYS } from './constants';
import { readFromStorage } from './utils/storage';
import { useApolloClient } from '@apollo/client';
import type { Spotify } from './types/SpotifyWebPlaybackSDK';

const SPOTIFY_CONNECT_SRC = 'https://sdk.scdn.co/spotify-player.js';

const SpotifyConnect = () => {
  const client = useApolloClient();

  useEffect(() => {
    let player: Spotify.Player;
    const script = document.createElement('script');
    script.src = SPOTIFY_CONNECT_SRC;
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = async () => {
      const token = readFromStorage<string>(STORAGE_KEYS.ACCESS_TOKEN, String);

      player = new window.Spotify.Player({
        name: 'Apollo Spotify Showcase',
        getOAuthToken: (cb) => {
          if (token) {
            cb(token);
          }
        },
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
    };

    return () => {
      player?.disconnect();
      document.body.removeChild(script);
    };
  }, [client]);

  return null;
};

export default SpotifyConnect;
