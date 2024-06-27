import * as Types from '../../../types/globalTypes.codegen';

export type ArtistRouteQueryVariables = Types.Exact<{
  artistId: Types.Scalars['ID']['input'];
}>;

export type ArtistRouteQuery = {
  __typename: 'Query';
  artist: {
    __typename: 'Artist';
    id: string;
    name: string;
    albums: {
      __typename: 'ArtistAlbumsConnection';
      edges: Array<{
        __typename: 'ArtistAlbumEdge';
        node: {
          __typename: 'Album';
          id: string;
          name: string;
          albumType: Types.AlbumType;
          totalTracks: number;
          releaseDate: { __typename: 'ReleaseDate'; date: string };
          images: Array<{ __typename: 'Image'; url: string }>;
        };
      }> | null;
    } | null;
    singles: {
      __typename: 'ArtistAlbumsConnection';
      edges: Array<{
        __typename: 'ArtistAlbumEdge';
        node: {
          __typename: 'Album';
          id: string;
          name: string;
          albumType: Types.AlbumType;
          totalTracks: number;
          releaseDate: { __typename: 'ReleaseDate'; date: string };
          images: Array<{ __typename: 'Image'; url: string }>;
        };
      }> | null;
    } | null;
    appearsOn: {
      __typename: 'ArtistAlbumsConnection';
      edges: Array<{
        __typename: 'ArtistAlbumEdge';
        node: {
          __typename: 'Album';
          id: string;
          name: string;
          albumType: Types.AlbumType;
          totalTracks: number;
          releaseDate: { __typename: 'ReleaseDate'; date: string };
          images: Array<{ __typename: 'Image'; url: string }>;
        };
      }> | null;
    } | null;
    followers: { __typename: 'Followers'; total: number };
    images: Array<{ __typename: 'Image'; url: string }>;
    relatedArtists: Array<{
      __typename: 'Artist';
      id: string;
      name: string;
      images: Array<{ __typename: 'Image'; url: string }>;
    }>;
    topTracks: Array<{
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
    }>;
  } | null;
};

export type ArtistRouteQuery_Albums = {
  __typename: 'ArtistAlbumsConnection';
  edges: Array<{
    __typename: 'ArtistAlbumEdge';
    node: {
      __typename: 'Album';
      id: string;
      name: string;
      albumType: Types.AlbumType;
      totalTracks: number;
      releaseDate: { __typename: 'ReleaseDate'; date: string };
      images: Array<{ __typename: 'Image'; url: string }>;
    };
  }> | null;
};
