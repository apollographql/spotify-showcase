import * as Types from '../../types/globalTypes.codegen';

export type EpisodePlaybackDetails_Episode = {
  __typename: 'Episode';
  id: string;
  name: string;
  show: { __typename: 'Show'; id: string; name: string };
};
