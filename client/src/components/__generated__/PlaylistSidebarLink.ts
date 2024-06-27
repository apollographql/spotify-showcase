import * as Types from '../../types/globalTypes.codegen';

export type PlaylistSidebarLink_PlaybackState = {
  __typename: 'PlaybackState';
  isPlaying: boolean;
  context: { __typename: 'PlaybackContext'; uri: string } | null;
};

export type PlaylistSidebarLink_CurrentUser = {
  __typename: 'CurrentUser';
  profile: { __typename: 'CurrentUserProfile'; id: string };
};

export type PlaylistSidebarLink_Playlist = {
  __typename: 'Playlist';
  id: string;
  uri: string;
  name: string;
  owner: { __typename: 'User'; id: string; displayName: string | null };
};
