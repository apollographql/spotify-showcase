import * as Types from '../../types/globalTypes.codegen';

export type LikeControlQueryVariables = Types.Exact<{
  ids: Array<Types.Scalars['ID']['input']> | Types.Scalars['ID']['input'];
}>;

export type LikeControlQuery = {
  __typename: 'Query';
  me: {
    __typename: 'CurrentUser';
    episodesContains: Array<boolean> | null;
    tracksContains: Array<boolean> | null;
  } | null;
};

export type LikeControl_PlaybackItem_Episode_ = {
  __typename: 'Episode';
  id: string;
};

export type LikeControl_PlaybackItem_Track_ = {
  __typename: 'Track';
  id: string;
};

export type LikeControl_PlaybackItem =
  | LikeControl_PlaybackItem_Episode_
  | LikeControl_PlaybackItem_Track_;
