import * as Types from '../../types/globalTypes.codegen';

export type AlbumTile_Album = {
  __typename: 'Album';
  id: string;
  name: string;
  albumType: Types.AlbumType;
  totalTracks: number;
  releaseDate: { __typename: 'ReleaseDate'; date: string };
  images: Array<{ __typename: 'Image'; url: string }>;
};
