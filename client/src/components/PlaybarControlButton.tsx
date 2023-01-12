import { ReactElement } from 'react';
import { gql } from '@apollo/client';
import {
  Action,
  PlaybarControlButton_playbackState as PlaybackState,
} from '../types/api';
import { LucideProps } from 'lucide-react';
import styles from './PlaybarControlButton.module.scss';

interface PlaybarControlButtonProps {
  action: Action;
  playbackState: PlaybackState | null | undefined;
  icon: ReactElement<LucideProps>;
}

const PlaybarControlButton = ({
  action,
  playbackState,
  icon,
}: PlaybarControlButtonProps) => {
  const disallows = playbackState?.actions.disallows ?? [];

  return (
    <button
      className={styles.playbarControlButton}
      disabled={disallows.includes(action)}
    >
      {icon}
    </button>
  );
};

PlaybarControlButton.fragments = {
  playbackState: gql`
    fragment PlaybarControlButton_playbackState on PlaybackState {
      actions {
        disallows
      }
    }
  `,
};

export default PlaybarControlButton;
