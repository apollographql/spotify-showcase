import * as Types from '../../types/globalTypes.codegen';

export type ArtistTile_Artist = {
  __typename: 'Artist';
  id: string;
  name: string;
  images: Array<{ __typename: 'Image'; url: string }>;
};
