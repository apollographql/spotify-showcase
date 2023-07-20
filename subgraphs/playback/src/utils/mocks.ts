import { Spotify } from '../dataSources/spotify.types';
import { SpotifyDataSource } from '../dataSources/spotify';

const userState: {
  [userId: string]: {
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
  };
} = {
  default: {
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
    item: { id: '2jJIENqpTOjBECelzBJAVL' },
    progress_ms: 0,
    repeat_state: 'off',
    shuffle_state: false,
    timestamp: Date.now(),
    currently_playing_type: 'track',
  },
};

export function addUser(userId: string) {
  console.log(`trying to add user ${userId}`);
  if (userState[userId]) return;

  //TODO - pick a song to use for playback state
  userState[userId] = userState['default'];
}

export class MockedSpotifyDataSource implements SpotifyDataSource {
  private userId: string;
  constructor(userId: string) {
    this.userId = userId;
  }
  getDevices(): Promise<Spotify.Object.List<'devices', Spotify.Object.Device>> {
    return new Promise(() => ({
      devices: [userState[this.userId]?.device],
    }));
  }
  getPlaybackState(params?: {
    additional_types?: string;
  }): Promise<Spotify.Object.PlaybackState> {
    if (userState[this.userId] && userState[this.userId].is_playing) {
      if (userState[this.userId].progress_ms >= 140000)
        userState[this.userId].progress_ms = 0;
      else userState[this.userId].progress_ms += 1000;
    }
    return new Promise((resolve) => resolve(userState[this.userId] as any));
  }
  resumePlayback({
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
    if (userState[this.userId] && !userState[this.userId].is_playing) {
      userState[this.userId].is_playing = true;
      userState[this.userId].device.is_active = true;
    } else return new Promise((resolve) => resolve(false));

    return new Promise((resolve) => resolve(true));
  }
  pausePlayback({
    params,
  }: {
    params: { device_id?: string };
  }): Promise<boolean> {
    if (userState[this.userId] && userState[this.userId].is_playing) {
      userState[this.userId].is_playing = false;
      userState[this.userId].device.is_active = false;
    } else return new Promise((resolve) => resolve(false));

    return new Promise((resolve) => resolve(true));
  }
  seekToPosition({
    params,
  }: {
    params: { position_ms: number; device_id?: string };
  }): Promise<boolean> {
    if (userState[this.userId])
      userState[this.userId].progress_ms = params.position_ms;
    else return new Promise((resolve) => resolve(false));

    return new Promise((resolve) => resolve(true));
  }
  setRepeatMode({
    params,
  }: {
    params: { state: Spotify.Object.RepeatMode; device_id?: string };
  }): Promise<boolean> {
    if (userState[this.userId])
      userState[this.userId].repeat_state = params.state;
    else return new Promise((resolve) => resolve(false));

    return new Promise((resolve) => resolve(true));
  }
  setVolume({
    params,
  }: {
    params: { volume_percent: number; device_id?: string };
  }): Promise<boolean> {
    if (userState[this.userId])
      userState[this.userId].device.volume_percent = params.volume_percent;
    else return new Promise((resolve) => resolve(false));

    return new Promise((resolve) => resolve(true));
  }
  shufflePlayback({
    params,
  }: {
    params: { state: boolean; device_id?: string };
  }): Promise<boolean> {
    if (userState[this.userId])
      userState[this.userId].shuffle_state = params.state;
    else return new Promise((resolve) => resolve(false));

    return new Promise((resolve) => resolve(true));
  }
  skipToNext({ params }: { params: { device_id?: string } }): Promise<boolean> {
    if (userState[this.userId]) userState[this.userId].progress_ms = 0;
    else return new Promise((resolve) => resolve(false));

    return new Promise((resolve) => resolve(true));
  }
  skipToPrevious({
    params,
  }: {
    params: { device_id?: string };
  }): Promise<boolean> {
    if (userState[this.userId]) userState[this.userId].progress_ms = 0;
    else return new Promise((resolve) => resolve(false));

    return new Promise((resolve) => resolve(true));
  }
  transferPlayback({
    body,
  }: {
    body: { device_ids: string[]; play?: boolean };
  }): Promise<boolean> {
    if (userState[this.userId] && body.device_ids.length > 0) {
      userState[this.userId].device.id = body.device_ids[0];
      userState[this.userId].device.is_active = body.play;
      userState[this.userId].is_playing = body.play;
    } else return new Promise((resolve) => resolve(false));

    return new Promise((resolve) => resolve(true));
  }
}
