import * as Types from '../../types/globalTypes.codegen';

export type EpisodeDetailsCell_Episode = {
  __typename: 'Episode';
  id: string;
  explicit: boolean;
  name: string;
  show: {
    __typename: 'Show';
    id: string;
    publisher: string;
    images: Array<{ __typename: 'Image'; url: string }>;
  };
};
