import * as Types from '../../types/globalTypes.codegen';

export type ArtistTopTracks_Tracks = {
  __typename: 'Track';
  id: string;
  durationMs: number;
  explicit: boolean;
  name: string;
  album: {
    __typename: 'Album';
    id: string;
    images: Array<{ __typename: 'Image'; url: string }>;
  };
};
