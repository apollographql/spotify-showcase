import { ReactNode } from 'react';
import { gql } from '@apollo/client';
import {
  DevicePopover_devices as Device,
  DevicePopover_playbackState as PlaybackState,
} from '../types/api';
import Popover from './Popover';
import AnimatedSoundWave from './AnimatedSoundWave';
import DeviceIcon from './DeviceIcon';
import usePlaybackState from '../hooks/usePlaybackState';
import useTransferPlaybackMutation from '../mutations/useTransferPlaybackMutation';
import { fragmentRegistry } from '../apollo/fragmentRegistry';

interface DevicePopoverProps {
  devices: Device[];
  children: ReactNode;
}

const PLAYBACK_STATE_FRAGMENT = gql`
  fragment DevicePopover_playbackState on PlaybackState {
    isPlaying
    device {
      id
    }
  }
`;

fragmentRegistry.register(gql`
  fragment DevicePopover_devices on Device {
    id
    name
    type
  }
`);

const DevicePopover = ({ devices, children }: DevicePopoverProps) => {
  const [transferPlayback] = useTransferPlaybackMutation();
  const playbackState = usePlaybackState<PlaybackState>({
    fragment: PLAYBACK_STATE_FRAGMENT,
  });
  const currentDevice = devices.find(
    (device) => device.id === playbackState?.device.id
  );
  const availableDevices = devices.filter(
    (device) => device.id !== currentDevice?.id
  );

  return (
    <Popover
      content={
        <div>
          {currentDevice && (
            <div className="flex items-center gap-4 p-4">
              {playbackState?.isPlaying ? (
                <AnimatedSoundWave size="1.5rem" />
              ) : (
                <DeviceIcon
                  size="1.5rem"
                  device={currentDevice}
                  className="text-green"
                />
              )}
              <div className="flex flex-col">
                <h3 className="text-base font-bold">Current device</h3>
                <span className="text-green-light text-sm">
                  {currentDevice.name}
                </span>
              </div>
            </div>
          )}
          {availableDevices.length > 0 && (
            <h4 className="my-2 px-4">Select another device</h4>
          )}
          <ul className="flex list-none flex-col">
            {availableDevices.map((device) => (
              <li key={device.id}>
                <button
                  className="flex w-full cursor-pointer items-center gap-4 rounded p-4 text-sm hover:bg-white/10"
                  onClick={() => {
                    transferPlayback({ deviceId: device.id ?? '' });
                  }}
                >
                  <DeviceIcon device={device} />
                  {device.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      }
    >
      {children}
    </Popover>
  );
};

export default DevicePopover;
