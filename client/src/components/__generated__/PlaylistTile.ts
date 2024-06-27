import * as Types from '../../types/globalTypes.codegen';

export type PlaylistTile_Playlist = {
  __typename: 'Playlist';
  id: string;
  name: string;
  description: string | null;
  uri: string;
  images: Array<{ __typename: 'Image'; url: string }> | null;
};
