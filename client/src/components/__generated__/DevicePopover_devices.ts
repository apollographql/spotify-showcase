/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DevicePopover_devices
// ====================================================

export interface DevicePopover_devices {
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
