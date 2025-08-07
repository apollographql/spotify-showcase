import cx from 'classnames';
import { gql } from '@apollo/client';
import { useReactiveVar } from "@apollo/client/react";
import { notificationVar } from '../vars';
import Notification from './Notification';
import useIsLoggedIn from '../hooks/useIsLoggedIn';
import usePlaybackState from '../hooks/usePlaybackState';
import { NotificationManager_playbackState as PlaybackState } from '../types/api';

const PLAYBACK_STATE_FRAGMENT = gql`
  fragment NotificationManager_playbackState on PlaybackState {
    device {
      id
    }
  }
`;

const NotificationManager = () => {
  const notification = useReactiveVar(notificationVar);
  const isLoggedIn = useIsLoggedIn();
  const playbackState = usePlaybackState<PlaybackState>({
    fragment: PLAYBACK_STATE_FRAGMENT,
  });

  return (
    <div
      className={cx(
        'fixed left-1/2 flex max-w-md -translate-x-1/2 flex-col items-center gap-4',
        {
          'bottom-8': !isLoggedIn,
          'bottom-28': isLoggedIn && !playbackState?.device,
          'bottom-36': isLoggedIn && playbackState?.device,
          hidden: notification === null,
        }
      )}
    >
      {notification && <Notification notification={notification} />}
    </div>
  );
};

export default NotificationManager;
