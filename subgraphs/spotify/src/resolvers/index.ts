import { GraphQLScalarType } from 'graphql';
import { Action } from './Action';
import { Actions } from './Actions';
import { Album } from './Album';
import { AlbumGroup } from './AlbumGroup';
import { AlbumTrackConnection } from './AlbumTrackConnection';
import { AlbumTrackEdge } from './AlbumTrackEdge';
import { AlbumType } from './AlbumType';
import { Artist } from './Artist';
import { ArtistAlbumEdge } from './ArtistAlbumEdge';
import { CountryCode } from './CountryCode';
import { CurrentUser } from './CurrentUser';
import { CurrentlyPlaying } from './CurrentlyPlaying';
import { DateTime } from './DateTime';
import { Developer } from './Developer';
import { Device } from './Device';
import { Episode } from './Episode';
import { ErrorRate } from './ErrorRate';
import { FeaturedPlaylistConnection } from './FeaturedPlaylistConnection';
import { FeaturedPlaylistEdge } from './FeaturedPlaylistEdge';
import { FieldConfig } from './FieldConfig';
import { FollowedArtistEdge } from './FollowedArtistEdge';
import { FollowedArtistsConnection } from './FollowedArtistsConnection';
import { Mutation } from './Mutation';
import { NewReleaseEdge } from './NewReleaseEdge';
import { NewReleasesConnection } from './NewReleasesConnection';
import { PageInfo } from './PageInfo';
import { PageInfoCursorBased } from './PageInfoCursorBased';
import { PlaybackContext } from './PlaybackContext';
import { PlaybackContextType } from './PlaybackContextType';
import { PlaybackItem } from './PlaybackItem';
import { PlaybackQueue } from './PlaybackQueue';
import { PlaybackState } from './PlaybackState';
import { Player } from './Player';
import { Playlist } from './Playlist';
import { PlaylistConnection } from './PlaylistConnection';
import { PlaylistEdge } from './PlaylistEdge';
import { PlaylistTrack } from './PlaylistTrack';
import { PlaylistTrackConnection } from './PlaylistTrackConnection';
import { PlaylistTrackEdge } from './PlaylistTrackEdge';
import { Query } from './Query';
import { RecentlyPlayedConnection } from './RecentlyPlayedConnection';
import { RecentlyPlayedEdge } from './RecentlyPlayedEdge';
import { Recommendations } from './Recommendations';
import { ReleaseDate } from './ReleaseDate';
import { ReleaseDatePrecision } from './ReleaseDatePrecision';
import { RepeatMode } from './RepeatMode';
import { ResumePoint } from './ResumePoint';
import { SavedAlbumEdge } from './SavedAlbumEdge';
import { SavedAlbumsConnection } from './SavedAlbumsConnection';
import { SavedEpisodeEdge } from './SavedEpisodeEdge';
import { SavedEpisodesConnection } from './SavedEpisodesConnection';
import { SavedShowEdge } from './SavedShowEdge';
import { SavedShowsConnection } from './SavedShowsConnection';
import { SavedTrackEdge } from './SavedTrackEdge';
import { SavedTracksConnection } from './SavedTracksConnection';
import { SearchAlbumEdge } from './SearchAlbumEdge';
import { SearchAlbumsConnection } from './SearchAlbumsConnection';
import { SearchArtistEdge } from './SearchArtistEdge';
import { SearchArtistsConnection } from './SearchArtistsConnection';
import { SearchEpisodeEdge } from './SearchEpisodeEdge';
import { SearchEpisodesConnection } from './SearchEpisodesConnection';
import { SearchExternalValue } from './SearchExternalValue';
import { SearchPlaylistEdge } from './SearchPlaylistEdge';
import { SearchPlaylistsConnection } from './SearchPlaylistsConnection';
import { SearchShowEdge } from './SearchShowEdge';
import { SearchShowsConnection } from './SearchShowsConnection';
import { SearchTrackEdge } from './SearchTrackEdge';
import { SearchTracksConnection } from './SearchTracksConnection';
import { SearchType } from './SearchType';
import { Show } from './Show';
import { ShowEpisodeEdge } from './ShowEpisodeEdge';
import { ShowEpisodesConnection } from './ShowEpisodesConnection';
import { TimeRange } from './TimeRange';
import { Timestamp } from './Timestamp';
import { TopArtistEdge } from './TopArtistEdge';
import { TopArtistsConnection } from './TopArtistsConnection';
import { TopTrackEdge } from './TopTrackEdge';
import { TopTracksConnection } from './TopTracksConnection';
import { Track } from './Track';
import { TrackAudioFeatures } from './TrackAudioFeatures';
import { User } from './User';
import { Resolver, Resolvers } from '../__generated__/resolvers-types';
import { wrapWithSynthetics } from './helpers';

const actualResolvers = {
  Action,
  Actions,
  Album,
  AlbumGroup,
  AlbumTrackConnection,
  AlbumTrackEdge,
  AlbumType,
  Artist,
  ArtistAlbumEdge,
  CountryCode,
  CurrentlyPlaying,
  CurrentUser,
  DateTime,
  Developer,
  Device,
  Episode,
  ErrorRate,
  FeaturedPlaylistConnection,
  FeaturedPlaylistEdge,
  FieldConfig,
  FollowedArtistEdge,
  FollowedArtistsConnection,
  Mutation,
  NewReleaseEdge,
  NewReleasesConnection,
  PageInfo,
  PageInfoCursorBased,
  PlaybackContext,
  PlaybackContextType,
  PlaybackItem,
  PlaybackQueue,
  PlaybackState,
  Player,
  Playlist,
  PlaylistConnection,
  PlaylistEdge,
  PlaylistTrack,
  PlaylistTrackConnection,
  PlaylistTrackEdge,
  Query,
  RecentlyPlayedConnection,
  RecentlyPlayedEdge,
  Recommendations,
  ReleaseDate,
  ReleaseDatePrecision,
  RepeatMode,
  ResumePoint,
  SavedAlbumEdge,
  SavedAlbumsConnection,
  SavedEpisodeEdge,
  SavedEpisodesConnection,
  SavedShowEdge,
  SavedShowsConnection,
  SavedTrackEdge,
  SavedTracksConnection,
  SearchAlbumEdge,
  SearchAlbumsConnection,
  SearchArtistEdge,
  SearchArtistsConnection,
  SearchEpisodeEdge,
  SearchEpisodesConnection,
  SearchExternalValue,
  SearchPlaylistEdge,
  SearchPlaylistsConnection,
  SearchShowEdge,
  SearchShowsConnection,
  SearchTrackEdge,
  SearchTracksConnection,
  SearchType,
  Show,
  ShowEpisodeEdge,
  ShowEpisodesConnection,
  TimeRange,
  Timestamp,
  TopArtistEdge,
  TopArtistsConnection,
  TopTrackEdge,
  TopTracksConnection,
  Track,
  TrackAudioFeatures,
  User,
};

//We are wrapping all fo the resolvers for a purpose in the demo to display `@apollo/client` resiliency when the API is throwing errors
type EnumResolver = Record<string, string>;
type ResolverMap = Record<string, EnumResolver | Resolver<unknown>>;

const wrapFieldResolvers = (typeResolvers: ResolverMap) => {
  if (typeResolvers instanceof GraphQLScalarType) {
    return typeResolvers;
  }

  return Object.fromEntries(
    Object.entries(typeResolvers).map(([key, resolver]) =>
      key === '__resolveType' || key === '__resolveReference'
        ? [key, resolver]
        : [
            key,
            typeof resolver === 'function'
              ? wrapWithSynthetics(resolver)
              : resolver,
          ]
    )
  );
};

const resolvers: Resolvers = Object.entries(actualResolvers).reduce(
  (resolvers, resolverName) => ({
    ...resolvers,
    [resolverName[0]]: wrapFieldResolvers(resolverName[1] as any),
  }),
  {}
);

export default resolvers;
