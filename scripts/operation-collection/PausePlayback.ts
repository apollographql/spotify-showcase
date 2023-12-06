import { gql } from 'graphql-tag';

const query = gql`
  mutation PausePlayback {
    pausePlayback {
      playbackState {
        isPlaying
      }
    }
  }
`;

export { query };
