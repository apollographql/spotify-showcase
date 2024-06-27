import * as Types from '../../types/globalTypes.codegen';

export type YourEpisodesTile_Connection = {
  __typename: 'SavedEpisodesConnection';
  pageInfo: { __typename: 'PageInfo'; total: number };
  edges: Array<{
    __typename: 'SavedEpisodeEdge';
    node: {
      __typename: 'Episode';
      id: string;
      name: string;
      show: { __typename: 'Show'; id: string; name: string };
    };
  }>;
};
