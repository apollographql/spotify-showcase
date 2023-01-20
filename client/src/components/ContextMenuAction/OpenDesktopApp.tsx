import { gql } from '@apollo/client';
import { OpenDesktopApp_playbackState as PlaybackState } from '../../types/api';
import usePlaybackState from '../../hooks/usePlaybackState';
import ContextMenu from '../ContextMenu';

interface OpenDesktopAppProps {
  uri: string;
}

const PLAYBACK_STATE_FRAGMENT = gql`
  fragment OpenDesktopApp_playbackState on PlaybackState {
    context {
      uri
    }
  }
`;

const OpenDesktopApp = ({ uri }: OpenDesktopAppProps) => {
  const playbackState = usePlaybackState<PlaybackState>({
    fragment: PLAYBACK_STATE_FRAGMENT,
  });

  const url = new URL(uri);

  if (playbackState?.context) {
    url.searchParams.set('context', playbackState.context.uri);
  }

  return (
    <ContextMenu.Action onSelect={() => window.open(url, '_blank')}>
      Open in Desktop app
    </ContextMenu.Action>
  );
};

export default OpenDesktopApp;
