import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './server/src/schema.graphql',
  documents: ['client/src/**/*.{ts,tsx}'],
  generates: {
    './client/src/introspection.json': {
      plugins: ['fragment-matcher'],
    },
    './client/src/types/api.ts': {
      config: {
        avoidOptionals: {
          field: true,
          inputValue: false,
          object: false,
          defaultValue: false,
        },
        dedupeOperationSuffix: true,
        defaultScalarType: 'unknown',
        nonOptionalTypename: true,
        omitOperationSuffix: true,
        skipTypeNameForRoot: true,
        scalars: {
          CountryCode: 'string',
          DateTime: 'string',
          ErrorRate: 'number',
          Timestamp: 'number',
        },
        namingConvention: {
          typeNames: 'keep',
        },
      },
      plugins: ['typescript', 'typescript-operations'],
    },
    './server/src/resolvers/types.ts': {
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
          Developer: '{}',
          Device: '../dataSources/spotify.types#Spotify#Object.Device',
          Episode:
            '../dataSources/spotify.types#Spotify#Object.Episode | Spotify.Object.EpisodeSimplified',
          FeaturedPlaylistConnection:
            '../dataSources/spotify.types#Spotify#Object.FeaturedPlaylists',
          FeaturedPlaylistEdge:
            '../dataSources/spotify.types#Spotify#Object.PlaylistSimplified',
          FieldConfig:
            '../fieldConfigs/fieldConfig#FieldConfig as FieldConfigType',
          NewReleasesConnection:
            '../dataSources/spotify.types#Spotify#Object.NewReleases',
          NewReleaseEdge:
            '../dataSources/spotify.types#Spotify#Object.AlbumSimplified',
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
          RecentlyPlayedConnection:
            '../dataSources/spotify.types#Spotify#Object.PaginatedCursorBased<Spotify.Object.PlayHistory>',
          RecentlyPlayedEdge:
            '../dataSources/spotify.types#Spotify#Object.PlayHistory',
          Recommendations:
            '../dataSources/spotify.types#Spotify#Object.Recommendations',
          ReleaseDate: './mappers#Releasable',
          ResumePoint:
            '../dataSources/spotify.types#Spotify#Object.ResumePoint',
          SavedAlbumsConnection:
            '../dataSources/spotify.types#Spotify#Object.Paginated<Spotify.Object.SavedAlbum>',
          SavedAlbumEdge:
            '../dataSources/spotify.types#Spotify#Object.SavedAlbum',
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
          TrackAudioFeatures:
            '../dataSources/spotify.types#Spotify#Object.TrackAudioFeatures',
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
            ALBUM: 'album',
            ARTIST: 'artist',
            AUDIO_FEATURES: 'audio_features',
            COLLECTION: 'collection',
            EPISODE: 'episode',
            GENRE: 'genre',
            PLAYLIST: 'playlist',
            SHOW: 'show',
            TRACK: 'track',
            USER: 'user',
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
          CountryCode: 'string',
          DateTime: 'Date',
          ErrorRate: 'number',
        },
      },
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
};

export default config;
