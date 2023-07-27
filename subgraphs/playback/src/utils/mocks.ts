import { Spotify, SpotifyDataSource } from 'spotify-api';

interface UserPlaybackState {
  actions: Spotify.Object.Actions;
  context: Spotify.Object.Context;
  device: Spotify.Object.Device;
  is_playing: boolean;
  item: { id: string };
  progress_ms: number;
  repeat_state: Spotify.Object.RepeatMode;
  shuffle_state: boolean;
  timestamp: number;
  currently_playing_type: Spotify.Object.CurrentlyPlayingType;
}

const MAX_PROGRESS_MS = 140_000;

function createUserPlaybackState(): UserPlaybackState {
  return {
    actions: { disallows: { interrupting_playback: true } },
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
    item: { id: '4lhhYqzREcts4uOOqWHjRJ' },
    progress_ms: 0,
    repeat_state: 'off',
    shuffle_state: false,
    timestamp: Date.now(),
    currently_playing_type: 'track',
  };
}

const userState: {
  [userId: string]: UserPlaybackState;
} = {};

function findOrCreateUserPlaybackState(userId: string) {
  return (userState[userId] ||= createUserPlaybackState());
}

export class MockedSpotifyDataSource implements SpotifyDataSource {
  private state: UserPlaybackState;

  constructor(userId: string) {
    this.state = findOrCreateUserPlaybackState(userId);
  }

  async getDevices(): Promise<
    Spotify.Object.List<'devices', Spotify.Object.Device>
  > {
    return { devices: [this.state.device] };
  }

  async getPlaybackState(params?: {
    additional_types?: string;
  }): Promise<Spotify.Object.PlaybackState> {
    if (this.state.is_playing) {
      if (this.state.progress_ms >= MAX_PROGRESS_MS) {
        this.state.progress_ms = 0;
      } else {
        this.state.progress_ms += 1000;
      }
    }

    return this.state as Spotify.Object.PlaybackState;
  }

  async resumePlayback({
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
  }): Promise<boolean> {
    if (this.state.is_playing) {
      return false;
    }

    this.state.is_playing = true;
    this.state.device.is_active = true;

    return true;
  }

  async pausePlayback({
    params,
  }: {
    params: { device_id?: string };
  }): Promise<boolean> {
    if (!this.state.is_playing) {
      return false;
    }

    this.state.is_playing = false;
    this.state.device.is_active = false;

    return true;
  }

  async seekToPosition({
    params,
  }: {
    params: { position_ms: number; device_id?: string };
  }): Promise<boolean> {
    this.state.progress_ms = params.position_ms;

    return true;
  }

  async setRepeatMode({
    params,
  }: {
    params: { state: Spotify.Object.RepeatMode; device_id?: string };
  }): Promise<boolean> {
    this.state.repeat_state = params.state;

    return true;
  }

  async setVolume({
    params,
  }: {
    params: { volume_percent: number; device_id?: string };
  }): Promise<boolean> {
    this.state.device.volume_percent = params.volume_percent;

    return true;
  }

  async shufflePlayback({
    params,
  }: {
    params: { state: boolean; device_id?: string };
  }): Promise<boolean> {
    this.state.shuffle_state = params.state;

    return true;
  }

  async skipToNext({
    params,
  }: {
    params: { device_id?: string };
  }): Promise<boolean> {
    this.state.progress_ms = 0;

    return true;
  }

  async skipToPrevious({
    params,
  }: {
    params: { device_id?: string };
  }): Promise<boolean> {
    this.state.progress_ms = 0;

    return true;
  }

  async transferPlayback({
    body,
  }: {
    body: { device_ids: string[]; play?: boolean };
  }): Promise<boolean> {
    if (body.device_ids.length === 0) {
      return false;
    }

    this.state.device.id = body.device_ids[0];
    this.state.device.is_active = body.play;
    this.state.is_playing = body.play;

    return true;
  }
}
