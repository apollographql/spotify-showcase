/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: NotificationManager_playbackState
// ====================================================

export interface NotificationManager_playbackState_device {
  __typename: "Device";
  /**
   * The device ID
   */
  id: string | null;
}

export interface NotificationManager_playbackState {
  __typename: "PlaybackState";
  /**
   * The device that is currently active.
   */
  device: NotificationManager_playbackState_device;
}
