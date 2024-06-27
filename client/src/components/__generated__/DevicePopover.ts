import * as Types from '../../types/globalTypes.codegen';

export type DevicePopover_PlaybackState = {
  __typename: 'PlaybackState';
  isPlaying: boolean;
  device: { __typename: 'Device'; id: string | null };
};

export type DevicePopover_Devices = {
  __typename: 'Device';
  id: string | null;
  name: string;
  type: string;
};
