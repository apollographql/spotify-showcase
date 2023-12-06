import { gql } from '@apollo/client';

const query = gql`
  subscription PlaybackState {
    playbackStateChanged {
      isPlaying
      progressMs
      item {
        name
      }
    }
  }
`;

export { query };
