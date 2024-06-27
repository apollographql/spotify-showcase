import * as Types from '../../../types/globalTypes.codegen';

export type EpisodeRouteQueryVariables = Types.Exact<{
  episodeId: Types.Scalars['ID']['input'];
}>;

export type EpisodeRouteQuery = {
  __typename: 'Query';
  episode: {
    __typename: 'Episode';
    id: string;
    name: string;
    durationMs: number;
    releaseDate: {
      __typename: 'ReleaseDate';
      date: string;
      precision: Types.ReleaseDatePrecision;
    };
    show: {
      __typename: 'Show';
      id: string;
      name: string;
      images: Array<{
        __typename: 'Image';
        url: string;
        vibrantColor: string | null;
      }>;
    };
    resumePoint: {
      __typename: 'ResumePoint';
      fullyPlayed: boolean;
      resumePositionMs: number;
    };
  } | null;
};
