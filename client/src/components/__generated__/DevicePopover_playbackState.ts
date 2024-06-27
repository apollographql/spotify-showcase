/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DevicePopover_playbackState
// ====================================================

export interface DevicePopover_playbackState_device {
  __typename: "Device";
  /**
   * The device ID
   */
  id: string | null;
}

export interface DevicePopover_playbackState {
  __typename: "PlaybackState";
  /**
   * If something is currently playing, return `true`.
   */
  isPlaying: boolean;
  /**
   * The device that is currently active.
   */
  device: DevicePopover_playbackState_device;
}
