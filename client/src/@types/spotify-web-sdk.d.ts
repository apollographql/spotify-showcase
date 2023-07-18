import type { Spotify } from '../types/SpotifyWebPlaybackSDK';

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: {
      Player: typeof Spotify.Player;
    };
  }
}
