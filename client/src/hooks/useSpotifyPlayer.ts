import { useEffect, useState } from 'react';
import { Spotify } from '../types/SpotifyWebPlaybackSDK';

interface Options {
  onReady?: () => void;
}

const useSpotifyPlayer = (token: string | null, { onReady }: Options = {}) => {
  const [deviceId, setDeviceId] = useState<string>();

  useEffect(() => {
    if (!token) {
      return;
    }

    let player: Spotify.Player;

    const initializePlayer = () => {
      player = new window.Spotify.Player({
        name: 'Apollo Spotify Showcase',
        getOAuthToken: (cb) => cb(token),
      });

      player.addListener('ready', ({ device_id }) => {
        setDeviceId(device_id);
        onReady?.();
      });

      player.connect();
    };

    if (window.Spotify) {
      initializePlayer();
    } else {
      window.onSpotifyWebPlaybackSDKReady = initializePlayer;
    }

    return () => {
      player?.disconnect();
    };
  }, [token]);

  return deviceId;
};

export default useSpotifyPlayer;
