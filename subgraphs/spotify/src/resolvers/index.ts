import { Action } from './Action';
import { Actions } from './Actions';
import { Album } from './Album';
import { AlbumGroup } from './AlbumGroup';
import { AlbumTrackConnection } from './AlbumTrackConnection';
import { AlbumTrackEdge } from './AlbumTrackEdge';
import { AlbumType } from './AlbumType';
import { Artist } from './Artist';
import { ArtistAlbumEdge } from './ArtistAlbumEdge';
import { ArtistAlbumsConnection } from './ArtistAlbumsConnection';
import { CountryCode } from './CountryCode';
import { CurrentUser } from './CurrentUser';
import { CurrentUserProfile } from './CurrentUserProfile';
import { CurrentlyPlaying } from './CurrentlyPlaying';
import { DateTime } from './DateTime';
import { Developer } from './Developer';
import { Device } from './Device';
import { Episode } from './Episode';
import { ExplicitContentSettings } from './ExplicitContentSettings';
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
import { UserProfile } from './UserProfile';

export const resolvers = {
  Action,
  Actions,
  Album,
  AlbumGroup,
  AlbumTrackConnection,
  AlbumTrackEdge,
  AlbumType,
  Artist,
  ArtistAlbumEdge,
  ArtistAlbumsConnection,
  CountryCode,
  CurrentlyPlaying,
  CurrentUser,
  CurrentUserProfile,
  DateTime,
  Developer,
  Device,
  Episode,
  ExplicitContentSettings,
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
  UserProfile,
};
