import { gql } from 'graphql-tag';

const query = gql`
  mutation ResumePlayback {
    resumePlayback {
      playbackState {
        isPlaying
      }
    }
  }
`;

export { query };
