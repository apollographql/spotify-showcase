import * as Types from '../../../types/globalTypes.codegen';

export type ShowRouteQueryVariables = Types.Exact<{
  showId: Types.Scalars['ID']['input'];
}>;

export type ShowRouteQuery = {
  __typename: 'Query';
  show: {
    __typename: 'Show';
    id: string;
    description: string;
    name: string;
    publisher: string;
    episodes: {
      __typename: 'ShowEpisodesConnection';
      edges: Array<{
        __typename: 'ShowEpisodeEdge';
        node: {
          __typename: 'Episode';
          id: string;
          name: string;
          durationMs: number;
          uri: string;
          releaseDate: {
            __typename: 'ReleaseDate';
            date: string;
            precision: Types.ReleaseDatePrecision;
          };
          resumePoint: {
            __typename: 'ResumePoint';
            fullyPlayed: boolean;
            resumePositionMs: number;
          };
        };
      }>;
    } | null;
    images: Array<{
      __typename: 'Image';
      url: string;
      vibrantColor: string | null;
    }>;
  } | null;
};

export type ShowRoute_PlaybackState = {
  __typename: 'PlaybackState';
  isPlaying: boolean;
  item:
    | { __typename: 'Episode'; id: string; uri: string }
    | { __typename: 'Track'; id: string; uri: string }
    | null;
};
