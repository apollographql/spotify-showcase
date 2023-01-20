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

interface DevicePopoverProps {
  devices: Device[];
  children: ReactNode;
}

const PLAYBACK_STATE_FRAGMENT = gql`
  fragment DevicePopover_playbackState on PlaybackState {
    device {
      id
    }
  }
`;

const DevicePopover = ({ devices, children }: DevicePopoverProps) => {
  const playbackState = usePlaybackState<PlaybackState>({
    fragment: PLAYBACK_STATE_FRAGMENT,
  });
  const currentDevice = devices.find(
    (device) => device.id === playbackState?.device.id
  );

  return (
    <Popover
      content={
        <div>
          {currentDevice && (
            <div className="flex items-center gap-4 p-4">
              <AnimatedSoundWave size="1.5rem" />
              <div className="flex flex-col">
                <h3 className="text-base font-bold">Current device</h3>
                <span className="text-green-light text-sm">
                  {currentDevice.name}
                </span>
              </div>
            </div>
          )}
          <h4 className="my-2 px-4">Select another device</h4>
          <ul className="flex list-none flex-col">
            {devices.map((device) => (
              <li
                key={device.id}
                className="flex cursor-pointer items-center gap-4 rounded p-4 text-sm hover:bg-white/10"
              >
                <DeviceIcon device={device} />
                {device.name}
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

DevicePopover.fragments = {
  devices: gql`
    fragment DevicePopover_devices on Device {
      id
      name
      type
    }
  `,
};

export default DevicePopover;
