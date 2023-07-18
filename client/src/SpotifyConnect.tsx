import { useEffect } from 'react';
import { STORAGE_KEYS } from './constants';
import { readFromStorage } from './utils/storage';
import { useApolloClient } from '@apollo/client';

type SpotifyWebPlayerEvent = 'ready';

interface SpotifyWebPlayerOptions {
  name: string;
  getOAuthToken: (callback: (access_token: string) => void) => void;
  volume?: number;
  enabledMediaSession?: boolean;
}

declare class SpotifyWebPlayer {
  constructor(options: SpotifyWebPlayerOptions);
  connect(): Promise<boolean>;
  disconnect(): void;
  addListener(event: SpotifyWebPlayerEvent, callback: () => void): void;
}

interface SpotifyWebSDK {
  Player: typeof SpotifyWebPlayer;
}

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: SpotifyWebSDK;
  }
}

const SPOTIFY_CONNECT_SRC = 'https://sdk.scdn.co/spotify-player.js';

const SpotifyConnect = () => {
  const client = useApolloClient();

  useEffect(() => {
    let player: SpotifyWebPlayer;
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
