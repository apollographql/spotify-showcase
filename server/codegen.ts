import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/schema.graphql',
  generates: {
    './src/resolvers/types.ts': {
      config: {
        contextType: '../types#ContextValue',
        defaultScalarType: 'unknown',
        enumsAsTypes: true,
        useIndexSignature: true,
        makeResolverTypeCallable: true,
        mappers: {
          Album:
            '../dataSources/spotify.types#Spotify#Object.Album | Spotify.Object.AlbumSimplified',
          AlbumTrackConnection:
            '../dataSources/spotify.types#Spotify#Object.Paginated<Spotify.Object.TrackSimplified>',
          AlbumTrackEdge:
            '../dataSources/spotify.types#Spotify#Object.TrackSimplified',
          Artist: '../dataSources/spotify.types#Spotify#Object.Artist',
          ArtistAlbumsConnection:
            '../dataSources/spotify.types#Spotify#Object.Paginated<Spotify.Object.AlbumSimplified>',
          ArtistAlbumEdge:
            '../dataSources/spotify.types#Spotify#Object.AlbumSimplified',
          CurrentUser:
            '../dataSources/spotify.types#Spotify#Object.CurrentUser',
          Episode:
            '../dataSources/spotify.types#Spotify#Object.Episode | Spotify.Object.EpisodeSimplified',
          FeaturedPlaylistConnection:
            '../dataSources/spotify.types#Spotify#Object.FeaturedPlaylists',
          FeaturedPlaylistEdge:
            '../dataSources/spotify.types#Spotify#Object.PlaylistSimplified',
          FieldConfig:
            '../fieldConfigs/fieldConfig#FieldConfig as FieldConfigType',
          PageInfo:
            '../dataSources/spotify.types#Spotify#Object.Paginated<unknown>',
          Playlist:
            '../dataSources/spotify.types#Spotify#Object.Playlist | Spotify.Object.PlaylistSimplified',
          PlaylistEdge: '../dataSources/spotify.types#Spotify#Object.Playlist',
          PlaylistConnection:
            '../dataSources/spotify.types#Spotify#Object.Paginated<Spotify.Object.Playlist>',
          PlaylistTrack:
            '../dataSources/spotify.types#Spotify#Object.Track | Spotify.Object.Episode',
          PlaylistTrackConnection:
            '../dataSources/spotify.types#Spotify#Object.Paginated<Spotify.Object.PlaylistTrack>',
          PlaylistTrackEdge:
            '../dataSources/spotify.types#Spotify#Object.PlaylistTrack',
          Recommendations:
            '../dataSources/spotify.types#Spotify#Object.Recommendations',
          ReleaseDate: './mappers#Releasable',
          SavedTrackConnection:
            '../dataSources/spotify.types#Spotify#Object.Paginated<Spotify.Object.SavedTrack>',
          SavedTrackEdge:
            '../dataSources/spotify.types#Spotify#Object.SavedTrack',
          Show: '../dataSources/spotify.types#Spotify#Object.Show | Spotify.Object.ShowSimplified',
          Track:
            '../dataSources/spotify.types#Spotify#Object.Track | Spotify.Object.TrackSimplified',
          User: '../dataSources/spotify.types#Spotify#Object.User',
        },
        enumValues: {
          AlbumGroup: {
            ALBUM: 'album',
            APPEARS_ON: 'appears_on',
            COMPILATION: 'compilation',
            SINGLE: 'single',
          },
          AlbumType: {
            ALBUM: 'album',
            COMPILATION: 'compilation',
            SINGLE: 'single',
          },
          ReleaseDatePrecision: {
            DAY: 'day',
            MONTH: 'month',
            YEAR: 'year',
          },
        },
        scalars: {
          DateTime: 'Date',
          ErrorRate: 'number',
        },
      },
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
};

export default config;
