import * as Types from '../../types/globalTypes.codegen';

export type SkipToNextMutationVariables = Types.Exact<{ [key: string]: never }>;

export type SkipToNextMutation = {
  __typename: 'Mutation';
  skipToNext: {
    __typename: 'SkipToNextResponse';
    playbackState: {
      __typename: 'PlaybackState';
      progressMs: number | null;
      item:
        | {
            __typename: 'Episode';
            id: string;
            name: string;
            show: {
              __typename: 'Show';
              id: string;
              name: string;
              images: Array<{ __typename: 'Image'; url: string }>;
            };
          }
        | {
            __typename: 'Track';
            id: string;
            name: string;
            album: {
              __typename: 'Album';
              id: string;
              name: string;
              images: Array<{ __typename: 'Image'; url: string }>;
            };
            artists: Array<{ __typename: 'Artist'; id: string; name: string }>;
          }
        | null;
    } | null;
  } | null;
};
