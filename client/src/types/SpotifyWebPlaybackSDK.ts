/* eslint-disable @typescript-eslint/no-namespace */

export namespace Spotify {
  export enum RepeatMode {
    NoRepeat = 0,
    RepeatAll = 1,
    RepeatOne = 2,
  }

  export interface WebPlaybackError {
    message: string;
  }

  export interface WebPlaybackPlayer {
    device_id: string;
  }

  export interface WebPlaybackState {
    context: {
      uri: string;
      metadata: Record<string, unknown> | null;
    };
    disallows: {
      pausing: boolean;
      peeking_next: boolean;
      peeking_prev: boolean;
      resuming: boolean;
      seeking: boolean;
      skipping_next: boolean;
      skipping_prev: boolean;
    };
    paused: boolean;
    position: number;
    repeat_mode: RepeatMode;
    shuffle: boolean;
    track_window: {
      current_track: WebPlaybackTrack;
      previous_tracks: WebPlaybackTrack[];
      next_tracks: WebPlaybackTrack[];
    };
  }

  export interface WebPlaybackTrack {
    uri: string;
    id: string;
    type: 'track' | 'episode' | 'ad';
    media_type: 'audio' | 'video';
    name: string;
    is_playable: boolean;
    album: {
      uri: string;
      name: string;
      images: { url: string }[];
    };
    artists: {
      uri: string;
      name: string;
    }[];
  }

  interface EventMap {
    account_error: WebPlaybackError;
    authentication_error: WebPlaybackError;
    autoplay_failed: never;
    initialization_error: WebPlaybackError;
    playback_error: WebPlaybackError;
    player_state_changed: WebPlaybackState;
    not_ready: WebPlaybackPlayer;
    ready: WebPlaybackPlayer;
  }

  type EventName = keyof EventMap;

  interface PlayerOptions {
    name: string;
    getOAuthToken: (callback: (accessToken: string) => void) => void;
    volume?: number;
    enabledMediaSession?: boolean;
  }

  export declare class Player {
    constructor(options: PlayerOptions);

    /**
     * Connect our Web Playback SDK instance to Spotify with the credentials
     * provided during initialization.
     *
     * @returns Returns a Promise containing a Boolean (either true or false) with the success of the connection.
     */
    connect(): Promise<boolean>;

    /**
     * Closes the current session our Web Playback SDK has with Spotify.
     */
    disconnect(): void;

    /**
     * Create a new event listener in the Web Playback SDK. Alias for {@link Spotify.Player#on}.
     *
     * @param event_name - A valid event name. See Web Playback SDK Events.
     * @param listener - A callback function to be fired when the event has been
     * executed.
     *
     * @returns Returns a Boolean. Returns true if the event listener for the
     * event_name is unique. See {@link #removeListener} for removing existing listeners.
     */
    addListener<TEventName extends keyof EventMap>(
      event_name: TEventName,
      listener: (event: EventMap[TEventName]) => void
    ): void;

    /**
     * Create a new event listener in the Web Playback SDK.
     *
     * @returns Returns a Boolean. Returns true if the event listener for the
     * event_name is unique. See {@link #removeListener} for removing existing listeners.
     */
    on<TEventName extends keyof EventMap>(
      event_name: TEventName,
      listener: (event: EventMap[TEventName]) => void
    ): void;

    /**
     * Remove an event listener in the Web Playback SDK.
     *
     * @param event_name - A valid event name. See Web Playback SDK Events.
     * @param listener - The callback function you would like to remove from the
     * listener. If not provided, it will remove all callbacks under the event_name.
     *
     * @returns Returns a Boolean. Returns true if the event name is valid with
     * registered callbacks from {@link #addListener}.
     */
    removeListener<TEventName extends EventName>(
      event_name: TEventName,
      listener?: (event: EventMap[TEventName]) => void
    ): boolean;

    /**
     * Collect metadata on local playback.
     *
     * @returns Returns a Promise. It will return either a {@link WebPlaybackState}
     * object or null depending on if the user is successfully connected.
     */
    getCurrentState(): Promise<WebPlaybackState | null>;

    /**
     * Rename the Spotify Player device. This is visible across all Spotify
     * Connect devices.
     *
     * @param name - The new desired player name.
     */
    setName(name: string): Promise<void>;

    /**
     * Get the local volume currently set in the Web Playback SDK.
     *
     * @returns Returns a Promise containing the local volume (as a Float between 0 and 1).
     */
    getVolume(): Promise<number>;

    /**
     * Set the local volume for the Web Playback SDK.
     *
     * @param volume - The new desired volume for local playback. Between 0 and
     * 1. Note: On iOS devices, the audio level is always under the user’s
     * physical control. The volume property is not settable in JavaScript.
     * Reading the volume property always returns 1. More details can be found
     * in the {@link https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html iOS-specific Considerations documentation page by Apple}.
     */
    setVolume(volume: number): Promise<void>;

    /**
     * Pause the local playback.
     */
    pause(): Promise<void>;

    /**
     * Resume the local playback.
     */
    resume(): Promise<void>;

    /**
     * Resume/pause the local playback.
     */
    togglePlay(): Promise<void>;

    /**
     * Seek to a position in the current track in local playback.
     *
     * @param position_ms - The position in milliseconds to seek to.
     */
    seek(position_ms: number): Promise<void>;

    /*
     * Switch to the previous track in local playback.
     */
    previousTrack(): Promise<void>;

    /**
     * Skip to the next track in local playback.
     */
    nextTrack(): Promise<void>;

    /**
     * 	Some browsers prevent autoplay of media by ensuring that all playback is
     * 	triggered by synchronous event-paths originating from user interaction
     * 	such as a click. In the autoplay disabled browser, to be able to keep
     * 	the playing state during transfer from other applications to yours, this
     * 	function needs to be called in advance. Otherwise it will be in pause
     * 	state once it’s transferred.
     */
    activateElement(): Promise<void>;
  }
}
