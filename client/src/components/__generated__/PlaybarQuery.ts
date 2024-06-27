/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PlaybarQuery
// ====================================================

export interface PlaybarQuery_me_player_devices {
  __typename: "Device";
  /**
   * The device ID
   */
  id: string | null;
  /**
   * A human-readable name for the device. Some devices have a name that the user
   * can configure (e.g. "Loudest speaker") and some devices have a generic name
   * associated with the manufacturer or device model.
   */
  name: string;
  /**
   * Device type, such as "computer", "smartphone" or "speaker".
   */
  type: string;
}

export interface PlaybarQuery_me_player {
  __typename: "Player";
  /**
   * Information about a user's available devices.
   */
  devices: PlaybarQuery_me_player_devices[] | null;
}

export interface PlaybarQuery_me {
  __typename: "CurrentUser";
  /**
   * Information about the user's current playback state
   */
  player: PlaybarQuery_me_player;
}

export interface PlaybarQuery {
  /**
   * Information about the current logged-in user.
   */
  me: PlaybarQuery_me | null;
}
