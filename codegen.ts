import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  generates: {
    './subgraphs/playback/src/__generated__/resolvers-types.ts': {
      schema: './subgraphs/playback/schema.graphql',
      config: {
        contextType: '../types/ContextValue#ContextValue',
        defaultScalarType: 'unknown',
        enumsAsTypes: true,
        useIndexSignature: true,
        federation: true,
        makeResolverTypeCallable: true,
        mappers: {
          Actions: 'spotify-types#Spotify#Object.Actions',
          Album:
            'spotify-types#Spotify#Object.Album | Spotify.Object.AlbumSimplified',
          AlbumTrackConnection:
            'spotify-types#Spotify#Object.Paginated<Spotify.Object.TrackSimplified>',
          AlbumTrackEdge: 'spotify-types#Spotify#Object.TrackSimplified',
          Artist: 'spotify-types#Spotify#Object.Artist',
          ArtistAlbumsConnection:
            'spotify-types#Spotify#Object.Paginated<Spotify.Object.AlbumSimplified>',
          ArtistAlbumEdge: 'spotify-types#Spotify#Object.AlbumSimplified',
          CurrentlyPlaying: 'spotify-types#Spotify#Object.CurrentlyPlaying',
          CurrentUser: 'spotify-types#Spotify#Object.CurrentUser',
          Developer: '{}',
          Device: 'spotify-types#Spotify#Object.Device',
          Episode:
            'spotify-types#Spotify#Object.Episode | Spotify.Object.EpisodeSimplified',
          FeaturedPlaylistConnection:
            'spotify-types#Spotify#Object.FeaturedPlaylists',
          FeaturedPlaylistEdge:
            'spotify-types#Spotify#Object.PlaylistSimplified',
          FieldConfig:
            '../fieldConfigs/fieldConfig#FieldConfig as FieldConfigType',
          FollowedArtistsConnection:
            'spotify-types#Spotify#Object.PaginatedCursorBased<Spotify.Object.Artist>',
          FollowedArtistEdge: 'spotify-types#Spotify#Object.Artist',
          NewReleasesConnection: 'spotify-types#Spotify#Object.NewReleases',
          NewReleaseEdge: 'spotify-types#Spotify#Object.AlbumSimplified',
          PageInfo: 'spotify-types#Spotify#Object.Paginated<unknown>',
          PageInfoCursorBased:
            'spotify-types#Spotify#Object.PaginatedCursorBased<unknown>',
          Player: '{}',
          PlaybackContext: 'spotify-types#Spotify#Object.Context',
          PlaybackContextItem:
            'spotify-types#Spotify#Object.Album | Spotify.Object.Artist | Spotify.Object.Playlist | Spotify.Object.Show',
          PlaybackItem:
            'spotify-types#Spotify#Object.Episode | Spotify.Object.Track',
          PlaybackQueue: 'spotify-types#Spotify#Object.PlaybackQueue',
          PlaybackState: 'spotify-types#Spotify#Object.PlaybackState',
          Playlist:
            'spotify-types#Spotify#Object.Playlist | Spotify.Object.PlaylistSimplified',
          PlaylistEdge: 'spotify-types#Spotify#Object.Playlist',
          PlaylistConnection:
            'spotify-types#Spotify#Object.Paginated<Spotify.Object.Playlist>',
          PlaylistTrack:
            'spotify-types#Spotify#Object.Track | Spotify.Object.Episode',
          PlaylistTrackConnection:
            'spotify-types#Spotify#Object.Paginated<Spotify.Object.PlaylistTrack>',
          PlaylistTrackEdge: 'spotify-types#Spotify#Object.PlaylistTrack',
          RecentlyPlayedConnection:
            'spotify-types#Spotify#Object.PaginatedCursorBased<Spotify.Object.PlayHistory>',
          RecentlyPlayedEdge: 'spotify-types#Spotify#Object.PlayHistory',
          Recommendations: 'spotify-types#Spotify#Object.Recommendations',
          ReleaseDate: './mappers#Releasable',
          ResumePoint: 'spotify-types#Spotify#Object.ResumePoint',
          SavedAlbumsConnection:
            'spotify-types#Spotify#Object.Paginated<Spotify.Object.SavedAlbum>',
          SavedAlbumEdge: 'spotify-types#Spotify#Object.SavedAlbum',
          SavedEpisodesConnection:
            'spotify-types#Spotify#Object.Paginated<Spotify.Object.SavedEpisode>',
          SavedEpisodeEdge: 'spotify-types#Spotify#Object.SavedEpisode',
          SavedShowsConnection:
            'spotify-types#Spotify#Object.Paginated<Spotify.Object.SavedShow>',
          SavedShowEdge: 'spotify-types#Spotify#Object.SavedShow',
          SavedTracksConnection:
            'spotify-types#Spotify#Object.Paginated<Spotify.Object.SavedTrack>',
          SavedTrackEdge: 'spotify-types#Spotify#Object.SavedTrack',
          SearchAlbumsConnection:
            'spotify-types#Spotify#Object.Paginated<Spotify.Object.AlbumSimplified>',
          SearchAlbumEdge: 'spotify-types#Spotify#Object.AlbumSimplified',
          SearchArtistsConnection:
            'spotify-types#Spotify#Object.Paginated<Spotify.Object.Artist>',
          SearchArtistEdge: 'spotify-types#Spotify#Object.Artist',
          SearchEpisodesConnection:
            'spotify-types#Spotify#Object.Paginated<Spotify.Object.EpisodeSimplified>',
          SearchEpisodeEdge: 'spotify-types#Spotify#Object.EpisodeSimplified',
          SearchPlaylistsConnection:
            'spotify-types#Spotify#Object.Paginated<Spotify.Object.PlaylistSimplified>',
          SearchPlaylistEdge: 'spotify-types#Spotify#Object.PlaylistSimplified',
          SearchTracksConnection:
            'spotify-types#Spotify#Object.Paginated<Spotify.Object.Track>',
          SearchTrackEdge: 'spotify-types#Spotify#Object.Track',
          SearchShowsConnection:
            'spotify-types#Spotify#Object.Paginated<Spotify.Object.ShowSimplified>',
          SearchShowEdge: 'spotify-types#Spotify#Object.ShowSimplified',
          SearchResults: 'spotify-types#Spotify#Object.SearchResults',
          Show: 'spotify-types#Spotify#Object.Show | Spotify.Object.ShowSimplified',
          ShowEpisodesConnection:
            'spotify-types#Spotify#Object.Paginated<Spotify.Object.EpisodeSimplified>',
          ShowEpisodeEdge: 'spotify-types#Spotify#Object.EpisodeSimplified',
          TopArtistsConnection:
            'spotify-types#Spotify#Object.Paginated<Spotify.Object.Artist>',
          TopArtistEdge: 'spotify-types#Spotify#Object.Artist',
          TopTracksConnection:
            'spotify-types#Spotify#Object.Paginated<Spotify.Object.Track>',
          TopTrackEdge: 'spotify-types#Spotify#Object.Track',
          Track:
            'spotify-types#Spotify#Object.Track | Spotify.Object.TrackSimplified',
          TrackAudioFeatures: 'spotify-types#Spotify#Object.TrackAudioFeatures',
          User: 'spotify-types#Spotify#Object.User',
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
          PlaybackContextType: {
            ALBUM: 'album',
            ARTIST: 'artist',
            AUDIO_FEATURES: 'audio_features',
            COLLECTION: 'collection',
            COLLECTION_YOUR_EPISODES: 'collectionyourepisodes',
            EPISODE: 'episode',
            GENRE: 'genre',
            PLAYLIST: 'playlist',
            SHOW: 'show',
            TRACK: 'track',
            USER: 'user',
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
    './subgraphs/spotify/src/__generated__/resolvers-types.ts': {
      schema: './subgraphs/spotify/schema.graphql',
      config: {
        contextType: '../types/ContextValue#ContextValue',
        defaultScalarType: 'unknown',
        enumsAsTypes: true,
        useIndexSignature: true,
        federation: true,
        makeResolverTypeCallable: true,
        mappers: {
          Actions: 'spotify-types#Spotify#Object.Actions',
          Album:
            'spotify-types#Spotify#Object.Album | Spotify.Object.AlbumSimplified',
          AlbumTrackConnection:
            'spotify-types#Spotify#Object.Paginated<Spotify.Object.TrackSimplified>',
          AlbumTrackEdge: 'spotify-types#Spotify#Object.TrackSimplified',
          Artist: 'spotify-types#Spotify#Object.Artist',
          ArtistAlbumsConnection:
            'spotify-types#Spotify#Object.Paginated<Spotify.Object.AlbumSimplified>',
          ArtistAlbumEdge: 'spotify-types#Spotify#Object.AlbumSimplified',
          CurrentlyPlaying: 'spotify-types#Spotify#Object.CurrentlyPlaying',
          CurrentUser: 'spotify-types#Spotify#Object.CurrentUser',
          Developer: '{}',
          Device: 'spotify-types#Spotify#Object.Device',
          Episode:
            'spotify-types#Spotify#Object.Episode | Spotify.Object.EpisodeSimplified',
          FeaturedPlaylistConnection:
            'spotify-types#Spotify#Object.FeaturedPlaylists',
          FeaturedPlaylistEdge:
            'spotify-types#Spotify#Object.PlaylistSimplified',
          FieldConfig:
            '../fieldConfigs/fieldConfig#FieldConfig as FieldConfigType',
          FollowedArtistsConnection:
            'spotify-types#Spotify#Object.PaginatedCursorBased<Spotify.Object.Artist>',
          FollowedArtistEdge: 'spotify-types#Spotify#Object.Artist',
          NewReleasesConnection: 'spotify-types#Spotify#Object.NewReleases',
          NewReleaseEdge: 'spotify-types#Spotify#Object.AlbumSimplified',
          PageInfo: 'spotify-types#Spotify#Object.Paginated<unknown>',
          PageInfoCursorBased:
            'spotify-types#Spotify#Object.PaginatedCursorBased<unknown>',
          Player: '{}',
          PlaybackContext: 'spotify-types#Spotify#Object.Context',
          PlaybackContextItem:
            'spotify-types#Spotify#Object.Album | Spotify.Object.Artist | Spotify.Object.Playlist | Spotify.Object.Show',
          PlaybackItem:
            'spotify-types#Spotify#Object.Episode | Spotify.Object.Track',
          PlaybackQueue: 'spotify-types#Spotify#Object.PlaybackQueue',
          PlaybackState: 'spotify-types#Spotify#Object.PlaybackState',
          Playlist:
            'spotify-types#Spotify#Object.Playlist | Spotify.Object.PlaylistSimplified',
          PlaylistEdge: 'spotify-types#Spotify#Object.Playlist',
          PlaylistConnection:
            'spotify-types#Spotify#Object.Paginated<Spotify.Object.Playlist>',
          PlaylistTrack:
            'spotify-types#Spotify#Object.Track | Spotify.Object.Episode',
          PlaylistTrackConnection:
            'spotify-types#Spotify#Object.Paginated<Spotify.Object.PlaylistTrack>',
          PlaylistTrackEdge: 'spotify-types#Spotify#Object.PlaylistTrack',
          RecentlyPlayedConnection:
            'spotify-types#Spotify#Object.PaginatedCursorBased<Spotify.Object.PlayHistory>',
          RecentlyPlayedEdge: 'spotify-types#Spotify#Object.PlayHistory',
          Recommendations: 'spotify-types#Spotify#Object.Recommendations',
          ReleaseDate: './mappers#Releasable',
          ResumePoint: 'spotify-types#Spotify#Object.ResumePoint',
          SavedAlbumsConnection:
            'spotify-types#Spotify#Object.Paginated<Spotify.Object.SavedAlbum>',
          SavedAlbumEdge: 'spotify-types#Spotify#Object.SavedAlbum',
          SavedEpisodesConnection:
            'spotify-types#Spotify#Object.Paginated<Spotify.Object.SavedEpisode>',
          SavedEpisodeEdge: 'spotify-types#Spotify#Object.SavedEpisode',
          SavedShowsConnection:
            'spotify-types#Spotify#Object.Paginated<Spotify.Object.SavedShow>',
          SavedShowEdge: 'spotify-types#Spotify#Object.SavedShow',
          SavedTracksConnection:
            'spotify-types#Spotify#Object.Paginated<Spotify.Object.SavedTrack>',
          SavedTrackEdge: 'spotify-types#Spotify#Object.SavedTrack',
          SearchAlbumsConnection:
            'spotify-types#Spotify#Object.Paginated<Spotify.Object.AlbumSimplified>',
          SearchAlbumEdge: 'spotify-types#Spotify#Object.AlbumSimplified',
          SearchArtistsConnection:
            'spotify-types#Spotify#Object.Paginated<Spotify.Object.Artist>',
          SearchArtistEdge: 'spotify-types#Spotify#Object.Artist',
          SearchEpisodesConnection:
            'spotify-types#Spotify#Object.Paginated<Spotify.Object.EpisodeSimplified>',
          SearchEpisodeEdge: 'spotify-types#Spotify#Object.EpisodeSimplified',
          SearchPlaylistsConnection:
            'spotify-types#Spotify#Object.Paginated<Spotify.Object.PlaylistSimplified>',
          SearchPlaylistEdge: 'spotify-types#Spotify#Object.PlaylistSimplified',
          SearchTracksConnection:
            'spotify-types#Spotify#Object.Paginated<Spotify.Object.Track>',
          SearchTrackEdge: 'spotify-types#Spotify#Object.Track',
          SearchShowsConnection:
            'spotify-types#Spotify#Object.Paginated<Spotify.Object.ShowSimplified>',
          SearchShowEdge: 'spotify-types#Spotify#Object.ShowSimplified',
          SearchResults: 'spotify-types#Spotify#Object.SearchResults',
          Show: 'spotify-types#Spotify#Object.Show | Spotify.Object.ShowSimplified',
          ShowEpisodesConnection:
            'spotify-types#Spotify#Object.Paginated<Spotify.Object.EpisodeSimplified>',
          ShowEpisodeEdge: 'spotify-types#Spotify#Object.EpisodeSimplified',
          TopArtistsConnection:
            'spotify-types#Spotify#Object.Paginated<Spotify.Object.Artist>',
          TopArtistEdge: 'spotify-types#Spotify#Object.Artist',
          TopTracksConnection:
            'spotify-types#Spotify#Object.Paginated<Spotify.Object.Track>',
          TopTrackEdge: 'spotify-types#Spotify#Object.Track',
          Track:
            'spotify-types#Spotify#Object.Track | Spotify.Object.TrackSimplified',
          TrackAudioFeatures: 'spotify-types#Spotify#Object.TrackAudioFeatures',
          User: 'spotify-types#Spotify#Object.User',
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
            COLLECTION_YOUR_EPISODES: 'collectionyourepisodes',
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
          SearchExternalValue: {
            AUDIO: 'audio',
          },
          SearchType: {
            ALBUM: 'album',
            ARTIST: 'artist',
            EPISODE: 'episode',
            PLAYLIST: 'playlist',
            TRACK: 'track',
            SHOW: 'show',
          },
          TimeRange: {
            LONG_TERM: 'long_term',
            MEDIUM_TERM: 'medium_term',
            SHORT_TERM: 'short_term',
          },
        },
        scalars: {
          ID: 'string',
          CountryCode: 'string',
          DateTime: 'Date',
          ErrorRate: 'number',
        },
      },
      plugins: ['typescript', 'typescript-resolvers'],
    },
    './client/src/introspection.json': {
      schema: './client/schema.graphql',
      documents: ['client/src/**/*.{ts,tsx}'],
      plugins: ['fragment-matcher'],
    },
    './client/src/types/api.ts': {
      schema: './client/schema.graphql',
      documents: ['client/src/**/*.{ts,tsx}'],
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
          ID: 'string',
          Timestamp: 'number',
        },
        namingConvention: {
          typeNames: 'keep',
        },
      },
      plugins: ['typescript', 'typescript-operations'],
    },
  },
};

export default config;
