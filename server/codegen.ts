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
          CurrentUser:
            '../dataSources/spotify.types#Spotify#Object.CurrentUser',
          PageInfo: '../dataSources/spotify.types#Spotify#Object.Paginated',
          Playlist: '../dataSources/spotify.types#Spotify#Object.Playlist',
          PlaylistConnection:
            '../dataSources/spotify.types#Spotify#Object.PaginatedPlaylists',
          PlaylistTrack:
            '../dataSources/spotify.types#Spotify#Object.PlaylistTrack',
          PlaylistTrackConnection:
            '../dataSources/spotify.types#Spotify#Object.PaginatedPlaylistTracks',
          PlaylistTrackEdge:
            '../dataSources/spotify.types#Spotify#Object.PlaylistTrackEdge',
          User: '../dataSources/spotify.types#Spotify#Object.User',
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
