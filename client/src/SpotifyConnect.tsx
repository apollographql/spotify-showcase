import { useEffect } from 'react';
import { STORAGE_KEYS } from './constants';
import { readFromStorage } from './utils/storage';
import { useApolloClient } from '@apollo/client';
import type { Spotify } from './types/SpotifyWebPlaybackSDK';
import useScript from './hooks/useScript';

const SpotifyConnect = () => {
  const client = useApolloClient();

  useScript('https://sdk.scdn.co/spotify-player.js', { async: true });

  useEffect(() => {
    let player: Spotify.Player;

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
    };
  }, [client]);

  return null;
};

export default SpotifyConnect;
