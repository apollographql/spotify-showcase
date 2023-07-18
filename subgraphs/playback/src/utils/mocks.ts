import { Spotify } from '../dataSources/spotify.types';
import { SpotifyDataSource } from '../dataSources/spotify';

const userState: {
  [userId: string]: {
    actions: { disallows: [string] };
    context: {
      external_urls: { spotify: string };
      href: string;
      type: 'artist' | 'playlist' | 'album' | 'show';
      uri: string;
    };
    device: {
      id: string;
      is_active: boolean;
      is_private_session: boolean;
      is_restricted: boolean;
      name: string;
      type: string;
      volume_percent: number;
    };
    is_playing: boolean;
    item: { id: string };
    progress_ms: number;
    repeat_state: 'context' | 'off' | 'track';
    shuffle_state: boolean;
    timestamp: number;
    currently_playing_type: string;
  };
} = {};

export class MockedSpotifyDataSource implements SpotifyDataSource {
  private static _instance: MockedSpotifyDataSource;
  public static instance(): MockedSpotifyDataSource {
    if (!MockedSpotifyDataSource._instance) {
      MockedSpotifyDataSource._instance = new MockedSpotifyDataSource();
    }

    return MockedSpotifyDataSource._instance;
  }

  public addUser(userId: string) {
    if (userState[userId]) return;

    //TODO - pick a song to use for playback state
    userState[userId] = {
      actions: { disallows: ['INTERRUPTING_PLAYBACK'] },
      context: {
        external_urls: { spotify: '' },
        href: '',
        type: 'album',
        uri: '',
      },
      device: {
        id: 'f15b1cd24a5ae5fe4224edc5d4958a06f07c5b99',
        is_private_session: false,
        is_restricted: false,
        name: `My Computer`,
        type: 'Computer',
        is_active: true,
        volume_percent: 100,
      },
      is_playing: true,
      item: { id: '2398rj23498fj' },
      progress_ms: 0,
      repeat_state: 'off',
      shuffle_state: false,
      timestamp: Date.now(),
      currently_playing_type: 'track',
    };
  }

  getDevices(
    ip?: string
  ): Promise<Spotify.Object.List<'devices', Spotify.Object.Device>> {
    return new Promise(() => ({
      devices: [userState[ip]?.device],
    }));
  }
  getPlaybackState(
    params?: {
      additional_types?: string;
    },
    ip?: string
  ): Promise<Spotify.Object.PlaybackState> {
    if (userState[ip] && userState[ip].is_playing) {
      if (userState[ip].progress_ms >= 140000) userState[ip].progress_ms = 0;
      else userState[ip].progress_ms += 1000;
    }
    return new Promise((resolve) => resolve(userState[ip] as any));
  }
  resumePlayback(
    {
      body,
      params,
    }: {
      params: { device_id?: string };
      body: {
        context_uri?: string;
        uris?: string[];
        offset?: { position?: number; uri?: string };
        position_ms?: number;
      };
    },
    ip: string
  ): Promise<boolean> {
    if (userState[ip] && !userState[ip].is_playing) {
      userState[ip].is_playing = true;
      userState[ip].device.is_active = true;
    } else return new Promise((resolve) => resolve(false));

    return new Promise((resolve) => resolve(true));
  }
  pausePlayback(
    {
      params,
    }: {
      params: { device_id?: string };
    },
    ip: string
  ): Promise<boolean> {
    if (userState[ip] && userState[ip].is_playing) {
      userState[ip].is_playing = false;
      userState[ip].device.is_active = false;
    } else return new Promise((resolve) => resolve(false));

    return new Promise((resolve) => resolve(true));
  }
  seekToPosition(
    {
      params,
    }: {
      params: { position_ms: number; device_id?: string };
    },
    ip: string
  ): Promise<boolean> {
    if (userState[ip]) userState[ip].progress_ms = params.position_ms;
    else return new Promise((resolve) => resolve(false));

    return new Promise((resolve) => resolve(true));
  }
  setRepeatMode(
    {
      params,
    }: {
      params: { state: Spotify.Object.RepeatMode; device_id?: string };
    },
    ip: string
  ): Promise<boolean> {
    if (userState[ip]) userState[ip].repeat_state = params.state;
    else return new Promise((resolve) => resolve(false));

    return new Promise((resolve) => resolve(true));
  }
  setVolume(
    {
      params,
    }: {
      params: { volume_percent: number; device_id?: string };
    },
    ip: string
  ): Promise<boolean> {
    if (userState[ip])
      userState[ip].device.volume_percent = params.volume_percent;
    else return new Promise((resolve) => resolve(false));

    return new Promise((resolve) => resolve(true));
  }
  shufflePlayback(
    {
      params,
    }: {
      params: { state: boolean; device_id?: string };
    },
    ip: string
  ): Promise<boolean> {
    if (userState[ip]) userState[ip].shuffle_state = params.state;
    else return new Promise((resolve) => resolve(false));

    return new Promise((resolve) => resolve(true));
  }
  skipToNext(
    { params }: { params: { device_id?: string } },
    ip: string
  ): Promise<boolean> {
    if (userState[ip]) userState[ip].progress_ms = 0;
    else return new Promise((resolve) => resolve(false));

    return new Promise((resolve) => resolve(true));
  }
  skipToPrevious(
    {
      params,
    }: {
      params: { device_id?: string };
    },
    ip: string
  ): Promise<boolean> {
    if (userState[ip]) userState[ip].progress_ms = 0;
    else return new Promise((resolve) => resolve(false));

    return new Promise((resolve) => resolve(true));
  }
  transferPlayback(
    {
      body,
    }: {
      body: { device_ids: string[]; play?: boolean };
    },
    ip: string
  ): Promise<boolean> {
    if (userState[ip] && body.device_ids.length > 0) {
      userState[ip].device.id = body.device_ids[0];
      userState[ip].device.is_active = body.play;
      userState[ip].is_playing = body.play;
    } else return new Promise((resolve) => resolve(false));

    return new Promise((resolve) => resolve(true));
  }
}
