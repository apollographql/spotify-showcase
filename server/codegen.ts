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
          Actions: '../dataSources/spotify.types#Spotify#Object.Actions',
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
          CurrentlyPlaying:
            '../dataSources/spotify.types#Spotify#Object.CurrentlyPlaying',
          CurrentUser:
            '../dataSources/spotify.types#Spotify#Object.CurrentUser',
          Device: '../dataSources/spotify.types#Spotify#Object.Device',
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
          Player: '{}',
          PlaybackContext:
            '../dataSources/spotify.types#Spotify#Object.Context',
          PlaybackContextItem:
            '../dataSources/spotify.types#Spotify#Object.Album | Spotify.Object.Artist | Spotify.Object.Playlist | Spotify.Object.Show',
          PlaybackItem:
            '../dataSources/spotify.types#Spotify#Object.Episode | Spotify.Object.Track',
          PlaybackQueue:
            '../dataSources/spotify.types#Spotify#Object.PlaybackQueue',
          PlaybackState:
            '../dataSources/spotify.types#Spotify#Object.PlaybackState',
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
          ResumePoint:
            '../dataSources/spotify.types#Spotify#Object.ResumePoint',
          SavedTracksConnection:
            '../dataSources/spotify.types#Spotify#Object.Paginated<Spotify.Object.SavedTrack>',
          SavedTrackEdge:
            '../dataSources/spotify.types#Spotify#Object.SavedTrack',
          Show: '../dataSources/spotify.types#Spotify#Object.Show | Spotify.Object.ShowSimplified',
          ShowEpisodesConnection:
            '../dataSources/spotify.types#Spotify#Object.Paginated<Spotify.Object.EpisodeSimplified>',
          ShowEpisodeEdge:
            '../dataSources/spotify.types#Spotify#Object.EpisodeSimplified',
          Track:
            '../dataSources/spotify.types#Spotify#Object.Track | Spotify.Object.TrackSimplified',
          User: '../dataSources/spotify.types#Spotify#Object.User',
        },
        enumValues: {
          Action: {
            INTERRUPTING_PLAYBACK: 'interrupting_playback',
            PAUSING: 'pausing',
            RESUMING: 'resuming',
            SEEKING: 'seeking',
            SKIPPING_NEXT: 'skipping_next',
            SKIPPING_PREV: 'skipping_prev',
            TOGGLING_REPEAT_CONTEXT: 'toggling_repeat_context',
            TOGGLING_SHUFFLE: 'toggling_shuffle',
            TOGGLING_REPEAT_TRACK: 'toggling_repeat_track',
            TRANSFERRING_PLAYBACK: 'transferring_playback',
          },
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
          PlaybackContextType: {
            ARTIST: 'artist',
            ALBUM: 'album',
            PLAYLIST: 'playlist',
            SHOW: 'show',
          },
          ReleaseDatePrecision: {
            DAY: 'day',
            MONTH: 'month',
            YEAR: 'year',
          },
          RepeatMode: {
            CONTEXT: 'context',
            OFF: 'off',
            TRACK: 'track',
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
