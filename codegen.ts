import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
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
          Actions: 'spotify-api#Spotify#Object.Actions',
          Album:
            'spotify-api#Spotify#Object.Album | Spotify.Object.AlbumSimplified',
          AlbumTrackConnection:
            'spotify-api#Spotify#Object.Paginated<Spotify.Object.TrackSimplified>',
          AlbumTrackEdge: 'spotify-api#Spotify#Object.TrackSimplified',
          Artist: 'spotify-api#Spotify#Object.Artist',
          ArtistAlbumsConnection:
            'spotify-api#Spotify#Object.Paginated<Spotify.Object.AlbumSimplified>',
          ArtistAlbumEdge: 'spotify-api#Spotify#Object.AlbumSimplified',
          CurrentlyPlaying: 'spotify-api#Spotify#Object.CurrentlyPlaying',
          CurrentUser: 'spotify-api#Spotify#Object.CurrentUser',
          Developer: '{}',
          Device: 'spotify-api#Spotify#Object.Device',
          Episode:
            'spotify-api#Spotify#Object.Episode | Spotify.Object.EpisodeSimplified',
          FeaturedPlaylistConnection:
            'spotify-api#Spotify#Object.FeaturedPlaylists',
          FeaturedPlaylistEdge: 'spotify-api#Spotify#Object.PlaylistSimplified',
          FollowedArtistsConnection:
            'spotify-api#Spotify#Object.PaginatedCursorBased<Spotify.Object.Artist>',
          FollowedArtistEdge: 'spotify-api#Spotify#Object.Artist',
          NewReleasesConnection: 'spotify-api#Spotify#Object.NewReleases',
          NewReleaseEdge: 'spotify-api#Spotify#Object.AlbumSimplified',
          PageInfo: 'spotify-api#Spotify#Object.Paginated<unknown>',
          PageInfoCursorBased:
            'spotify-api#Spotify#Object.PaginatedCursorBased<unknown>',
          Player: '{}',
          PlaybackContext: 'spotify-api#Spotify#Object.Context',
          PlaybackContextItem:
            'spotify-api#Spotify#Object.Album | Spotify.Object.Artist | Spotify.Object.Playlist | Spotify.Object.Show',
          PlaybackItem:
            'spotify-api#Spotify#Object.Episode | Spotify.Object.Track',
          PlaybackQueue: 'spotify-api#Spotify#Object.PlaybackQueue',
          PlaybackState: 'spotify-api#Spotify#Object.PlaybackState',
          Playlist:
            'spotify-api#Spotify#Object.Playlist | Spotify.Object.PlaylistSimplified',
          PlaylistEdge: 'spotify-api#Spotify#Object.Playlist',
          PlaylistConnection:
            'spotify-api#Spotify#Object.Paginated<Spotify.Object.Playlist>',
          PlaylistTrack:
            'spotify-api#Spotify#Object.Track | Spotify.Object.Episode',
          PlaylistTrackConnection:
            'spotify-api#Spotify#Object.Paginated<Spotify.Object.PlaylistTrack>',
          PlaylistTrackEdge: 'spotify-api#Spotify#Object.PlaylistTrack',
          RecentlyPlayedConnection:
            'spotify-api#Spotify#Object.PaginatedCursorBased<Spotify.Object.PlayHistory>',
          RecentlyPlayedEdge: 'spotify-api#Spotify#Object.PlayHistory',
          Recommendations: 'spotify-api#Spotify#Object.Recommendations',
          ReleaseDate: './mappers#Releasable',
          ResumePoint: 'spotify-api#Spotify#Object.ResumePoint',
          SavedAlbumsConnection:
            'spotify-api#Spotify#Object.Paginated<Spotify.Object.SavedAlbum>',
          SavedAlbumEdge: 'spotify-api#Spotify#Object.SavedAlbum',
          SavedEpisodesConnection:
            'spotify-api#Spotify#Object.Paginated<Spotify.Object.SavedEpisode>',
          SavedEpisodeEdge: 'spotify-api#Spotify#Object.SavedEpisode',
          SavedShowsConnection:
            'spotify-api#Spotify#Object.Paginated<Spotify.Object.SavedShow>',
          SavedShowEdge: 'spotify-api#Spotify#Object.SavedShow',
          SavedTracksConnection:
            'spotify-api#Spotify#Object.Paginated<Spotify.Object.SavedTrack>',
          SavedTrackEdge: 'spotify-api#Spotify#Object.SavedTrack',
          SearchAlbumsConnection:
            'spotify-api#Spotify#Object.Paginated<Spotify.Object.AlbumSimplified>',
          SearchAlbumEdge: 'spotify-api#Spotify#Object.AlbumSimplified',
          SearchArtistsConnection:
            'spotify-api#Spotify#Object.Paginated<Spotify.Object.Artist>',
          SearchArtistEdge: 'spotify-api#Spotify#Object.Artist',
          SearchEpisodesConnection:
            'spotify-api#Spotify#Object.Paginated<Spotify.Object.EpisodeSimplified>',
          SearchEpisodeEdge: 'spotify-api#Spotify#Object.EpisodeSimplified',
          SearchPlaylistsConnection:
            'spotify-api#Spotify#Object.Paginated<Spotify.Object.PlaylistSimplified>',
          SearchPlaylistEdge: 'spotify-api#Spotify#Object.PlaylistSimplified',
          SearchTracksConnection:
            'spotify-api#Spotify#Object.Paginated<Spotify.Object.Track>',
          SearchTrackEdge: 'spotify-api#Spotify#Object.Track',
          SearchShowsConnection:
            'spotify-api#Spotify#Object.Paginated<Spotify.Object.ShowSimplified>',
          SearchShowEdge: 'spotify-api#Spotify#Object.ShowSimplified',
          SearchResults: 'spotify-api#Spotify#Object.SearchResults',
          Show: 'spotify-api#Spotify#Object.Show | Spotify.Object.ShowSimplified',
          ShowEpisodesConnection:
            'spotify-api#Spotify#Object.Paginated<Spotify.Object.EpisodeSimplified>',
          ShowEpisodeEdge: 'spotify-api#Spotify#Object.EpisodeSimplified',
          TopArtistsConnection:
            'spotify-api#Spotify#Object.Paginated<Spotify.Object.Artist>',
          TopArtistEdge: 'spotify-api#Spotify#Object.Artist',
          TopTracksConnection:
            'spotify-api#Spotify#Object.Paginated<Spotify.Object.Track>',
          TopTrackEdge: 'spotify-api#Spotify#Object.Track',
          Track:
            'spotify-api#Spotify#Object.Track | Spotify.Object.TrackSimplified',
          TrackAudioFeatures: 'spotify-api#Spotify#Object.TrackAudioFeatures',
          User: 'spotify-api#Spotify#Object.User',
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
          Actions: 'spotify-api#Spotify#Object.Actions',
          Album:
            'spotify-api#Spotify#Object.Album | Spotify.Object.AlbumSimplified',
          AlbumTrackConnection:
            'spotify-api#Spotify#Object.Paginated<Spotify.Object.TrackSimplified>',
          AlbumTrackEdge: 'spotify-api#Spotify#Object.TrackSimplified',
          Artist: 'spotify-api#Spotify#Object.Artist',
          ArtistAlbumsConnection:
            'spotify-api#Spotify#Object.Paginated<Spotify.Object.AlbumSimplified>',
          ArtistAlbumEdge: 'spotify-api#Spotify#Object.AlbumSimplified',
          CurrentlyPlaying: 'spotify-api#Spotify#Object.CurrentlyPlaying',
          CurrentUser: 'spotify-api#Spotify#Object.CurrentUser',
          CurrentUserProfile: 'spotify-api#Spotify#Object.CurrentUser',
          Developer: '{}',
          Device: 'spotify-api#Spotify#Object.Device',
          Episode:
            'spotify-api#Spotify#Object.Episode | Spotify.Object.EpisodeSimplified',
          ExplicitContentSettings:
            'spotify-api#Spotify#Object.ExplicitContentSettings',
          FeaturedPlaylistConnection:
            'spotify-api#Spotify#Object.FeaturedPlaylists',
          FeaturedPlaylistEdge: 'spotify-api#Spotify#Object.PlaylistSimplified',
          FieldConfig:
            '@shared/field-synthetics#FieldConfig as FieldConfigType',
          FollowedArtistsConnection:
            'spotify-api#Spotify#Object.PaginatedCursorBased<Spotify.Object.Artist>',
          FollowedArtistEdge: 'spotify-api#Spotify#Object.Artist',
          NewReleasesConnection: 'spotify-api#Spotify#Object.NewReleases',
          NewReleaseEdge: 'spotify-api#Spotify#Object.AlbumSimplified',
          PageInfo: 'spotify-api#Spotify#Object.Paginated<unknown>',
          PageInfoCursorBased:
            'spotify-api#Spotify#Object.PaginatedCursorBased<unknown>',
          Player: '{}',
          PlaybackContext: 'spotify-api#Spotify#Object.Context',
          PlaybackContextItem:
            'spotify-api#Spotify#Object.Album | Spotify.Object.Artist | Spotify.Object.Playlist | Spotify.Object.Show',
          PlaybackItem:
            'spotify-api#Spotify#Object.Episode | Spotify.Object.Track',
          PlaybackQueue: 'spotify-api#Spotify#Object.PlaybackQueue',
          PlaybackState: 'spotify-api#Spotify#Object.PlaybackState',
          Playlist:
            'spotify-api#Spotify#Object.Playlist | Spotify.Object.PlaylistSimplified',
          PlaylistEdge: 'spotify-api#Spotify#Object.Playlist',
          PlaylistConnection:
            'spotify-api#Spotify#Object.Paginated<Spotify.Object.Playlist>',
          PlaylistTrack:
            'spotify-api#Spotify#Object.Track | Spotify.Object.Episode',
          PlaylistTrackConnection:
            'spotify-api#Spotify#Object.Paginated<Spotify.Object.PlaylistTrack>',
          PlaylistTrackEdge: 'spotify-api#Spotify#Object.PlaylistTrack',
          RecentlyPlayedConnection:
            'spotify-api#Spotify#Object.PaginatedCursorBased<Spotify.Object.PlayHistory>',
          RecentlyPlayedEdge: 'spotify-api#Spotify#Object.PlayHistory',
          Recommendations: 'spotify-api#Spotify#Object.Recommendations',
          ReleaseDate: './mappers#Releasable',
          ResumePoint: 'spotify-api#Spotify#Object.ResumePoint',
          SavedAlbumsConnection:
            'spotify-api#Spotify#Object.Paginated<Spotify.Object.SavedAlbum>',
          SavedAlbumEdge: 'spotify-api#Spotify#Object.SavedAlbum',
          SavedEpisodesConnection:
            'spotify-api#Spotify#Object.Paginated<Spotify.Object.SavedEpisode>',
          SavedEpisodeEdge: 'spotify-api#Spotify#Object.SavedEpisode',
          SavedShowsConnection:
            'spotify-api#Spotify#Object.Paginated<Spotify.Object.SavedShow>',
          SavedShowEdge: 'spotify-api#Spotify#Object.SavedShow',
          SavedTracksConnection:
            'spotify-api#Spotify#Object.Paginated<Spotify.Object.SavedTrack>',
          SavedTrackEdge: 'spotify-api#Spotify#Object.SavedTrack',
          SearchAlbumsConnection:
            'spotify-api#Spotify#Object.Paginated<Spotify.Object.AlbumSimplified>',
          SearchAlbumEdge: 'spotify-api#Spotify#Object.AlbumSimplified',
          SearchArtistsConnection:
            'spotify-api#Spotify#Object.Paginated<Spotify.Object.Artist>',
          SearchArtistEdge: 'spotify-api#Spotify#Object.Artist',
          SearchEpisodesConnection:
            'spotify-api#Spotify#Object.Paginated<Spotify.Object.EpisodeSimplified>',
          SearchEpisodeEdge: 'spotify-api#Spotify#Object.EpisodeSimplified',
          SearchPlaylistsConnection:
            'spotify-api#Spotify#Object.Paginated<Spotify.Object.PlaylistSimplified>',
          SearchPlaylistEdge: 'spotify-api#Spotify#Object.PlaylistSimplified',
          SearchTracksConnection:
            'spotify-api#Spotify#Object.Paginated<Spotify.Object.Track>',
          SearchTrackEdge: 'spotify-api#Spotify#Object.Track',
          SearchShowsConnection:
            'spotify-api#Spotify#Object.Paginated<Spotify.Object.ShowSimplified>',
          SearchShowEdge: 'spotify-api#Spotify#Object.ShowSimplified',
          SearchResults: 'spotify-api#Spotify#Object.SearchResults',
          Show: 'spotify-api#Spotify#Object.Show | Spotify.Object.ShowSimplified',
          ShowEpisodesConnection:
            'spotify-api#Spotify#Object.Paginated<Spotify.Object.EpisodeSimplified>',
          ShowEpisodeEdge: 'spotify-api#Spotify#Object.EpisodeSimplified',
          TopArtistsConnection:
            'spotify-api#Spotify#Object.Paginated<Spotify.Object.Artist>',
          TopArtistEdge: 'spotify-api#Spotify#Object.Artist',
          TopTracksConnection:
            'spotify-api#Spotify#Object.Paginated<Spotify.Object.Track>',
          TopTrackEdge: 'spotify-api#Spotify#Object.Track',
          Track:
            'spotify-api#Spotify#Object.Track | Spotify.Object.TrackSimplified',
          TrackAudioFeatures: 'spotify-api#Spotify#Object.TrackAudioFeatures',
          User: 'spotify-api#Spotify#Object.User',
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
    './client/src/apollo/introspection.json': {
      schema: [
        './client/schema.graphql',
        './client/src/apollo/localSchema.graphql',
      ],
      documents: ['client/src/**/*.{ts,tsx}'],
      plugins: ['fragment-matcher'],
    },
    './client/src/apollo/__generated__/local-resolvers.ts': {
      schema: './client/src/apollo/localSchema.graphql',
      plugins: ['typescript', 'typescript-resolvers'],
    },
    './client/src/types/api.ts': {
      schema: [
        './client/schema.graphql',
        './client/src/apollo/localSchema.graphql',
      ],
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
        inlineFragmentTypes: 'mask',
        customDirectives: {
          apolloUnmask: true,
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
