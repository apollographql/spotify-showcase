import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/schema.graphql',
  generates: {
    './src/resolvers/types.ts': {
      config: {
        contextType: 'ContextValue',
        defaultScalarType: 'unknown',
        enumsAsTypes: true,
        useIndexSignature: true,
        mappers: {
          Artist:
            '../dataSources/spotify.types#Spotify#Object.Artist | Spotify.Object.ArtistSimplified',
          CurrentUser:
            '../dataSources/spotify.types#Spotify#Object.CurrentUser',
          Episode:
            '../dataSources/spotify.types#Spotify#Object.Episode | Spotify.Object.EpisodeSimplified',
          PageInfo:
            '../dataSources/spotify.types#Spotify#Object.Paginated<any>',
          Playlist: '../dataSources/spotify.types#Spotify#Object.Playlist',
          PlaylistConnection:
            '../dataSources/spotify.types#Spotify#Object.Paginated<Spotify.Object.Playlist>',
          PlaylistTrack:
            '../dataSources/spotify.types#Spotify#Object.PlaylistItem',
          PlaylistTrackConnection:
            '../dataSources/spotify.types#Spotify#Object.Paginated<Spotify.Object.PlaylistTrack>',
          PlaylistTrackEdge:
            '../dataSources/spotify.types#Spotify#Object.PlaylistTrack',
          Recommendations:
            '../dataSources/spotify.types#Spotify#Object.Recommendations',
          Track:
            '../dataSources/spotify.types#Spotify#Object.Track | Spotify.Object.TrackSimplified',
          User: '../dataSources/spotify.types#Spotify#Object.User | Spotify.Object.UserSimplified',
        },
        scalars: {
          DateTime: 'Date',
        },
      },
      plugins: [
        { add: { content: "import { ContextValue } from '../types';" } },
        'typescript',
        'typescript-resolvers',
      ],
    },
  },
};

export default config;
