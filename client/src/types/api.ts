import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AlbumTileAlbumFragment = { __typename?: 'Album', id: string, name: string, albumType: AlbumType, totalTracks: number, releaseDate: { __typename?: 'ReleaseDate', date: string }, images: Array<{ __typename?: 'Image', url: string }> };

export type AlbumTrackTitleCellPlaybackStateFragment = { __typename?: 'PlaybackState', context?: { __typename?: 'PlaybackContext', uri: string } | null, item?: { __typename?: 'Episode', id: string, uri: string } | { __typename?: 'Track', id: string, uri: string } | null };

export type AlbumTrackTitleCellAlbumFragment = { __typename?: 'Album', id: string, uri: string };

export type AlbumTrackTitleCellTrackFragment = { __typename?: 'Track', id: string, name: string, uri: string, explicit: boolean, artists: Array<{ __typename?: 'Artist', id: string, name: string }> };

export type AlbumTracksTableAlbumFragment = { __typename?: 'Album', id: string, uri: string, tracks?: { __typename?: 'AlbumTrackConnection', edges: Array<{ __typename?: 'AlbumTrackEdge', node: { __typename?: 'Track', id: string, uri: string, durationMs: number, trackNumber?: number | null, name: string, explicit: boolean, artists: Array<{ __typename?: 'Artist', id: string, name: string }> } }> } | null };

export type ArtistTileArtistFragment = { __typename?: 'Artist', id: string, name: string, images: Array<{ __typename?: 'Image', url: string }> };

export type ArtistTopTracksTracksFragment = { __typename?: 'Track', id: string, durationMs: number, explicit: boolean, name: string, album: { __typename?: 'Album', id: string, images: Array<{ __typename?: 'Image', url: string }> } };

type AvatarProfileCurrentUserProfileFragment = { __typename?: 'CurrentUserProfile', id: string, images?: Array<{ __typename?: 'Image', url: string }> | null };

type AvatarProfileUserFragment = { __typename?: 'User', id: string, images?: Array<{ __typename?: 'Image', url: string }> | null };

export type AvatarProfileFragment = AvatarProfileCurrentUserProfileFragment | AvatarProfileUserFragment;

export type AddToPlaylistQueryQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AddToPlaylistQueryQuery = { __typename?: 'Query', me?: { __typename?: 'CurrentUser', playlists?: { __typename?: 'PlaylistConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, limit: number, offset: number }, edges: Array<{ __typename?: 'PlaylistEdge', node: { __typename?: 'Playlist', id: string, name: string } }> } | null } | null };

export type CurrentUserQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQueryQuery = { __typename?: 'Query', me?: { __typename?: 'CurrentUser', profile: { __typename?: 'CurrentUserProfile', id: string, displayName?: string | null, images?: Array<{ __typename?: 'Image', url: string }> | null } } | null };

export type DevicePopoverPlaybackStateFragment = { __typename?: 'PlaybackState', isPlaying: boolean, device: { __typename?: 'Device', id?: string | null } };

export type DevicePopoverDevicesFragment = { __typename?: 'Device', id?: string | null, name: string, type: string };

export type EpisodeDetailsCellEpisodeFragment = { __typename?: 'Episode', id: string, explicit: boolean, name: string, show: { __typename?: 'Show', id: string, publisher: string, images: Array<{ __typename?: 'Image', url: string }> } };

export type EpisodePlaybackDetailsEpisodeFragment = { __typename?: 'Episode', id: string, name: string, show: { __typename?: 'Show', id: string, name: string } };

export type EpisodeRemainingDurationEpisodeFragment = { __typename?: 'Episode', id: string, durationMs: number, resumePoint: { __typename?: 'ResumePoint', fullyPlayed: boolean, resumePositionMs: number } };

export type LikeControlQueryQueryVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type LikeControlQueryQuery = { __typename?: 'Query', me?: { __typename?: 'CurrentUser', episodesContains?: Array<boolean> | null, tracksContains?: Array<boolean> | null } | null };

type LikeControlPlaybackItemEpisodeFragment = { __typename: 'Episode', id: string };

type LikeControlPlaybackItemTrackFragment = { __typename: 'Track', id: string };

export type LikeControlPlaybackItemFragment = LikeControlPlaybackItemEpisodeFragment | LikeControlPlaybackItemTrackFragment;

export type LikedSongsTilePlaybackStateFragment = { __typename?: 'PlaybackState', isPlaying: boolean, context?: { __typename?: 'PlaybackContext', uri: string } | null };

export type LikedSongsTileConnectionFragment = { __typename?: 'SavedTracksConnection', pageInfo: { __typename?: 'PageInfo', total: number }, edges: Array<{ __typename?: 'SavedTrackEdge', node: { __typename?: 'Track', id: string, name: string, artists: Array<{ __typename?: 'Artist', id: string, name: string }> } }> };

export type SidebarQueryQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SidebarQueryQuery = { __typename?: 'Query', me?: { __typename?: 'CurrentUser', profile: { __typename?: 'CurrentUserProfile', id: string }, playlists?: { __typename?: 'PlaylistConnection', pageInfo: { __typename?: 'PageInfo', offset: number, limit: number, hasNextPage: boolean }, edges: Array<{ __typename?: 'PlaylistEdge', node: { __typename?: 'Playlist', id: string, uri: string, name: string, images?: Array<{ __typename?: 'Image', url: string }> | null, owner: { __typename?: 'User', id: string, displayName?: string | null } } }> } | null } | null };

export type NotificationManagerPlaybackStateFragment = { __typename?: 'PlaybackState', device: { __typename?: 'Device', id?: string | null } };

export type PlaybackItemProgressBarPlaybackStateFragment = { __typename?: 'PlaybackState', isPlaying: boolean, progressMs?: number | null, timestamp: any, item?: { __typename?: 'Episode', id: string, durationMs: number } | { __typename?: 'Track', id: string, durationMs: number } | null };

export type PlaybackStateFragmentFragment = { __typename?: 'PlaybackState', isPlaying: boolean, repeatState: RepeatMode, shuffleState: boolean, progressMs?: number | null, timestamp: any, actions: { __typename?: 'Actions', disallows: Array<Action> }, context?: { __typename?: 'PlaybackContext', uri: string, type: PlaybackContextType } | null, device: { __typename?: 'Device', id?: string | null, name: string, type: string, volumePercent: number }, item?: { __typename: 'Episode', id: string, durationMs: number, name: string, show: { __typename?: 'Show', id: string, name: string, images: Array<{ __typename?: 'Image', url: string }> } } | { __typename: 'Track', id: string, durationMs: number, name: string, uri: string, album: { __typename?: 'Album', id: string, name: string, images: Array<{ __typename?: 'Image', url: string }> }, artists: Array<{ __typename?: 'Artist', id: string, uri: string, name: string }> } | null };

export type PlaybackStateSubscriberQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type PlaybackStateSubscriberQueryQuery = { __typename?: 'Query', me?: { __typename?: 'CurrentUser', player: { __typename?: 'Player', playbackState?: { __typename?: 'PlaybackState', isPlaying: boolean, repeatState: RepeatMode, shuffleState: boolean, progressMs?: number | null, timestamp: any, actions: { __typename?: 'Actions', disallows: Array<Action> }, context?: { __typename?: 'PlaybackContext', uri: string, type: PlaybackContextType } | null, device: { __typename?: 'Device', id?: string | null, name: string, type: string, volumePercent: number }, item?: { __typename: 'Episode', id: string, durationMs: number, name: string, show: { __typename?: 'Show', id: string, name: string, images: Array<{ __typename?: 'Image', url: string }> } } | { __typename: 'Track', id: string, durationMs: number, name: string, uri: string, album: { __typename?: 'Album', id: string, name: string, images: Array<{ __typename?: 'Image', url: string }> }, artists: Array<{ __typename?: 'Artist', id: string, uri: string, name: string }> } | null } | null } } | null };

export type PlaybackStateSubscriberSubscriptionSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type PlaybackStateSubscriberSubscriptionSubscription = { __typename?: 'Subscription', playbackStateChanged?: { __typename?: 'PlaybackState', isPlaying: boolean, repeatState: RepeatMode, shuffleState: boolean, progressMs?: number | null, timestamp: any, actions: { __typename?: 'Actions', disallows: Array<Action> }, context?: { __typename?: 'PlaybackContext', uri: string, type: PlaybackContextType } | null, device: { __typename?: 'Device', id?: string | null, name: string, type: string, volumePercent: number }, item?: { __typename: 'Episode', id: string, durationMs: number, name: string, show: { __typename?: 'Show', id: string, name: string, images: Array<{ __typename?: 'Image', url: string }> } } | { __typename: 'Track', id: string, durationMs: number, name: string, uri: string, album: { __typename?: 'Album', id: string, name: string, images: Array<{ __typename?: 'Image', url: string }> }, artists: Array<{ __typename?: 'Artist', id: string, uri: string, name: string }> } | null } | null };

export type PlaybarQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type PlaybarQueryQuery = { __typename?: 'Query', me?: { __typename?: 'CurrentUser', player: { __typename?: 'Player', devices?: Array<{ __typename?: 'Device', id?: string | null, name: string, type: string }> | null } } | null };

export type PlaybarPlaybackStateFragment = { __typename?: 'PlaybackState', isPlaying: boolean, repeatState: RepeatMode, shuffleState: boolean, progressMs?: number | null, timestamp: any, actions: { __typename?: 'Actions', disallows: Array<Action> }, context?: { __typename?: 'PlaybackContext', uri: string, type: PlaybackContextType } | null, device: { __typename?: 'Device', id?: string | null, name: string, type: string, volumePercent: number }, item?: { __typename: 'Episode', id: string, durationMs: number, name: string, show: { __typename?: 'Show', id: string, name: string, images: Array<{ __typename?: 'Image', url: string }> } } | { __typename: 'Track', id: string, durationMs: number, name: string, uri: string, album: { __typename?: 'Album', id: string, name: string, images: Array<{ __typename?: 'Image', url: string }> }, artists: Array<{ __typename?: 'Artist', id: string, uri: string, name: string }> } | null };

export type PlaylistDetailsModalQueryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type PlaylistDetailsModalQueryQuery = { __typename?: 'Query', playlist?: { __typename?: 'Playlist', id: string, name: string, description?: string | null, images?: Array<{ __typename?: 'Image', url: string }> | null } | null };

export type PlaylistSidebarLinkPlaybackStateFragment = { __typename?: 'PlaybackState', isPlaying: boolean, context?: { __typename?: 'PlaybackContext', uri: string } | null };

export type PlaylistSidebarLinkCurrentUserFragment = { __typename?: 'CurrentUser', profile: { __typename?: 'CurrentUserProfile', id: string } };

export type PlaylistSidebarLinkPlaylistFragment = { __typename?: 'Playlist', id: string, uri: string, name: string, owner: { __typename?: 'User', id: string, displayName?: string | null } };

export type PlaylistTilePlaylistFragment = { __typename?: 'Playlist', id: string, name: string, description?: string | null, uri: string, images?: Array<{ __typename?: 'Image', url: string }> | null };

export type PlaylistTitleCellPlaybackStateFragment = { __typename?: 'PlaybackState', context?: { __typename?: 'PlaybackContext', uri: string } | null, item?: { __typename?: 'Episode', id: string, uri: string } | { __typename?: 'Track', id: string, uri: string } | null };

export type PlaylistTitleCellPlaylistFragment = { __typename?: 'Playlist', id: string, uri: string };

type PlaylistTitleCellPlaylistTrackEpisodeFragment = { __typename?: 'Episode', explicit: boolean, id: string, name: string, uri: string, show: { __typename?: 'Show', id: string, publisher: string, images: Array<{ __typename?: 'Image', url: string }> } };

type PlaylistTitleCellPlaylistTrackTrackFragment = { __typename?: 'Track', explicit: boolean, id: string, name: string, uri: string, artists: Array<{ __typename?: 'Artist', id: string, name: string }>, album: { __typename?: 'Album', id: string, name: string, images: Array<{ __typename?: 'Image', url: string }> } };

export type PlaylistTitleCellPlaylistTrackFragment = PlaylistTitleCellPlaylistTrackEpisodeFragment | PlaylistTitleCellPlaylistTrackTrackFragment;

export type TrackNumberCellPlaybackStateFragment = { __typename?: 'PlaybackState', isPlaying: boolean, context?: { __typename?: 'PlaybackContext', uri: string } | null, item?: { __typename?: 'Episode', id: string, uri: string } | { __typename?: 'Track', id: string, uri: string } | null };

export type TrackNumberCellTrackFragment = { __typename?: 'Track', id: string, uri: string, trackNumber?: number | null };

export type TrackPlaybackDetailsContextFragment = { __typename?: 'PlaybackContext', uri: string, type: PlaybackContextType };

export type TrackPlaybackDetailsTrackFragment = { __typename?: 'Track', id: string, name: string, uri: string, album: { __typename?: 'Album', id: string, name: string }, artists: Array<{ __typename?: 'Artist', id: string, uri: string, name: string }> };

export type TrackTitleCellPlaybackStateFragment = { __typename?: 'PlaybackState', context?: { __typename?: 'PlaybackContext', uri: string } | null, item?: { __typename?: 'Episode', id: string, uri: string } | { __typename?: 'Track', id: string, uri: string } | null };

export type TrackTitleCellTrackFragment = { __typename?: 'Track', id: string, explicit: boolean, name: string, uri: string, album: { __typename?: 'Album', id: string, images: Array<{ __typename?: 'Image', url: string }> }, artists: Array<{ __typename?: 'Artist', id: string, name: string }> };

export type YourEpisodesTileConnectionFragment = { __typename?: 'SavedEpisodesConnection', pageInfo: { __typename?: 'PageInfo', total: number }, edges: Array<{ __typename?: 'SavedEpisodeEdge', node: { __typename?: 'Episode', id: string, name: string, show: { __typename?: 'Show', id: string, name: string } } }> };

export type SavedTracksContainsQueryQueryVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type SavedTracksContainsQueryQuery = { __typename?: 'Query', me?: { __typename?: 'CurrentUser', tracksContains?: Array<boolean> | null } | null };

export type SavedTracksContainsFragmentFragment = { __typename?: 'CurrentUser', tracksContains?: Array<boolean> | null };

export type AddToPlaylistMutationMutationVariables = Exact<{
  input: AddItemsToPlaylistInput;
}>;


export type AddToPlaylistMutationMutation = { __typename?: 'Mutation', addItemsToPlaylist?: { __typename?: 'AddItemsToPlaylistPayload', playlist?: { __typename?: 'Playlist', id: string } | null } | null };

export type AddToQueueMutationMutationVariables = Exact<{
  input: AddItemToPlaybackQueueInput;
}>;


export type AddToQueueMutationMutation = { __typename?: 'Mutation', addItemToPlaybackQueue?: { __typename?: 'AddItemToPlaybackQueuePayload', playbackQueue?: { __typename?: 'PlaybackQueue', currentlyPlaying?: { __typename: 'Episode', id: string } | { __typename: 'Track', id: string } | null } | null } | null };

export type CreatePlaylistMutationVariables = Exact<{
  input: CreatePlaylistInput;
}>;


export type CreatePlaylistMutation = { __typename?: 'Mutation', createPlaylist?: { __typename?: 'CreatePlaylistPayload', playlist?: { __typename?: 'Playlist', id: string, name: string, description?: string | null, public?: boolean | null } | null } | null };

export type PausePlaybackMutationMutationVariables = Exact<{ [key: string]: never; }>;


export type PausePlaybackMutationMutation = { __typename?: 'Mutation', pausePlayback?: { __typename?: 'PausePlaybackResponse', playbackState?: { __typename?: 'PlaybackState', isPlaying: boolean } | null } | null };

export type RemoveFromPlaylistMutationMutationVariables = Exact<{
  input: RemoveItemFromPlaylistInput;
}>;


export type RemoveFromPlaylistMutationMutation = { __typename?: 'Mutation', removeItemFromPlaylist?: { __typename?: 'RemoveItemFromPlaylistPayload', playlist?: { __typename?: 'Playlist', id: string } | null } | null };

export type RemoveSavedAlbumsMutationMutationVariables = Exact<{
  input: RemoveSavedAlbumsInput;
}>;


export type RemoveSavedAlbumsMutationMutation = { __typename?: 'Mutation', removeSavedAlbums?: { __typename?: 'RemoveSavedAlbumsPayload', removedAlbums?: Array<{ __typename?: 'Album', id: string }> | null } | null };

export type RemovedSavedAlbumsMutationFragmentFragment = { __typename?: 'CurrentUser', albumsContains?: Array<boolean> | null };

export type RemoveSavedTracksMutationMutationVariables = Exact<{
  input: RemoveSavedTracksInput;
}>;


export type RemoveSavedTracksMutationMutation = { __typename?: 'Mutation', removeSavedTracks?: { __typename?: 'RemoveSavedTracksPayload', removedTracks?: Array<{ __typename?: 'Track', id: string }> | null } | null };

export type RemovedSavedTracksMutationFragmentFragment = { __typename?: 'CurrentUser', tracksContains?: Array<boolean> | null };

export type ResetFieldConfigMutationMutationVariables = Exact<{
  input: ResetFieldConfigInput;
}>;


export type ResetFieldConfigMutationMutation = { __typename?: 'Mutation', resetFieldConfig?: { __typename?: 'ResetFieldConfigPayload', fieldConfig?: { __typename?: 'FieldConfig', schemaField: { __typename?: 'SchemaField', fieldName: string, typename: string } } | null } | null };

export type ResumePlaybackMutationMutationVariables = Exact<{
  input?: InputMaybe<ResumePlaybackInput>;
}>;


export type ResumePlaybackMutationMutation = { __typename?: 'Mutation', resumePlayback?: { __typename?: 'ResumePlaybackPayload', playbackState?: { __typename?: 'PlaybackState', isPlaying: boolean, context?: { __typename?: 'PlaybackContext', uri: string, type: PlaybackContextType } | null } | null } | null };

export type UseResumePlaybackStateFragmentFragment = { __typename?: 'PlaybackState', context?: { __typename?: 'PlaybackContext', uri: string, type: PlaybackContextType } | null };

export type SaveAlbumsMutationMutationVariables = Exact<{
  input: SaveAlbumsInput;
}>;


export type SaveAlbumsMutationMutation = { __typename?: 'Mutation', saveAlbums?: { __typename?: 'SaveAlbumsPayload', savedAlbums?: Array<{ __typename?: 'Album', id: string }> | null } | null };

export type SaveAlbumsMutationFragmentFragment = { __typename?: 'CurrentUser', albumsContains?: Array<boolean> | null };

export type SaveTracksMutationMutationVariables = Exact<{
  input: SaveTracksInput;
}>;


export type SaveTracksMutationMutation = { __typename?: 'Mutation', saveTracks?: { __typename?: 'SaveTracksPayload', savedTracks?: Array<{ __typename?: 'Track', id: string }> | null } | null };

export type SaveTracksMutationFragmentFragment = { __typename?: 'CurrentUser', tracksContains?: Array<boolean> | null };

export type SeekToPositionMutationMutationVariables = Exact<{
  positionMs: Scalars['Int']['input'];
}>;


export type SeekToPositionMutationMutation = { __typename?: 'Mutation', seekToPosition?: { __typename?: 'SeekToPositionResponse', playbackState?: { __typename?: 'PlaybackState', progressMs?: number | null } | null } | null };

export type SetRepeatModeMutationMutationVariables = Exact<{
  state: RepeatMode;
}>;


export type SetRepeatModeMutationMutation = { __typename?: 'Mutation', setRepeatMode?: { __typename?: 'SetRepeatModeResponse', playbackState?: { __typename?: 'PlaybackState', repeatState: RepeatMode } | null } | null };

export type SetVolumeMutationMutationVariables = Exact<{
  volumePercent: Scalars['Int']['input'];
}>;


export type SetVolumeMutationMutation = { __typename?: 'Mutation', setVolume?: { __typename?: 'SetVolumeResponse', playbackState?: { __typename?: 'PlaybackState', device: { __typename?: 'Device', id?: string | null, volumePercent: number } } | null } | null };

export type SetVolumeCacheFragmentFragment = { __typename?: 'PlaybackState', device: { __typename?: 'Device', id?: string | null, volumePercent: number } };

export type ShufflePlaybackMutationMutationVariables = Exact<{
  state: Scalars['Boolean']['input'];
}>;


export type ShufflePlaybackMutationMutation = { __typename?: 'Mutation', shufflePlayback?: { __typename?: 'ShufflePlaybackResponse', playbackState?: { __typename?: 'PlaybackState', shuffleState: boolean } | null } | null };

export type SkipToNextMutationMutationVariables = Exact<{ [key: string]: never; }>;


export type SkipToNextMutationMutation = { __typename?: 'Mutation', skipToNext?: { __typename?: 'SkipToNextResponse', playbackState?: { __typename?: 'PlaybackState', progressMs?: number | null, item?: { __typename: 'Episode', id: string, name: string, show: { __typename?: 'Show', id: string, name: string, images: Array<{ __typename?: 'Image', url: string }> } } | { __typename: 'Track', id: string, name: string, album: { __typename?: 'Album', id: string, name: string, images: Array<{ __typename?: 'Image', url: string }> }, artists: Array<{ __typename?: 'Artist', id: string, name: string }> } | null } | null } | null };

export type SkipToPreviousMutationMutationVariables = Exact<{ [key: string]: never; }>;


export type SkipToPreviousMutationMutation = { __typename?: 'Mutation', skipToPrevious?: { __typename?: 'SkipToPreviousResponse', playbackState?: { __typename?: 'PlaybackState', progressMs?: number | null, item?: { __typename: 'Episode', id: string, name: string, show: { __typename?: 'Show', id: string, name: string, images: Array<{ __typename?: 'Image', url: string }> } } | { __typename: 'Track', id: string, name: string, album: { __typename?: 'Album', id: string, name: string, images: Array<{ __typename?: 'Image', url: string }> }, artists: Array<{ __typename?: 'Artist', id: string, name: string }> } | null } | null } | null };

export type TransferPlaybackMutationMutationVariables = Exact<{
  input: TransferPlaybackInput;
}>;


export type TransferPlaybackMutationMutation = { __typename?: 'Mutation', transferPlayback?: { __typename?: 'TransferPlaybackPayload', playbackState?: { __typename?: 'PlaybackState', device: { __typename?: 'Device', id?: string | null } } | null } | null };

export type UpdateFieldConfigMutationMutationVariables = Exact<{
  input: UpdateFieldConfigInput;
}>;


export type UpdateFieldConfigMutationMutation = { __typename?: 'Mutation', updateFieldConfig?: { __typename?: 'UpdateFieldConfigPayload', fieldConfig?: { __typename?: 'FieldConfig', timeout: number, errorRate: any, schemaField: { __typename?: 'SchemaField', fieldName: string, typename: string } } | null } | null };

export type MyPlaylistsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type MyPlaylistsQuery = { __typename?: 'Query', me?: { __typename?: 'CurrentUser', playlists?: { __typename?: 'PlaylistConnection', edges: Array<{ __typename?: 'PlaylistEdge', node: { __typename?: 'Playlist', id: string, name: string } }> } | null } | null };

export type AlbumRouteQueryQueryVariables = Exact<{
  albumId: Scalars['ID']['input'];
}>;


export type AlbumRouteQueryQuery = { __typename?: 'Query', me?: { __typename?: 'CurrentUser', albumsContains?: Array<boolean> | null } | null, album?: { __typename?: 'Album', id: string, albumType: AlbumType, name: string, totalTracks: number, uri: string, artists: Array<{ __typename?: 'Artist', id: string, name: string }>, copyrights: Array<{ __typename?: 'Copyright', text: string, type?: CopyrightType | null }>, images: Array<{ __typename?: 'Image', url: string, vibrantColor?: string | null }>, releaseDate: { __typename?: 'ReleaseDate', date: string, precision: ReleaseDatePrecision }, tracks?: { __typename?: 'AlbumTrackConnection', edges: Array<{ __typename?: 'AlbumTrackEdge', node: { __typename?: 'Track', id: string, uri: string, durationMs: number, trackNumber?: number | null, name: string, explicit: boolean, artists: Array<{ __typename?: 'Artist', id: string, name: string }> } }> } | null } | null };

export type AlbumRoutePlaybackStateFragmentFragment = { __typename?: 'PlaybackState', isPlaying: boolean, context?: { __typename?: 'PlaybackContext', uri: string } | null };

export type ArtistRouteQueryQueryVariables = Exact<{
  artistId: Scalars['ID']['input'];
}>;


export type ArtistRouteQueryQuery = { __typename?: 'Query', artist?: { __typename?: 'Artist', id: string, name: string, albums?: { __typename?: 'ArtistAlbumsConnection', edges?: Array<{ __typename?: 'ArtistAlbumEdge', node: { __typename?: 'Album', id: string, name: string, albumType: AlbumType, totalTracks: number, releaseDate: { __typename?: 'ReleaseDate', date: string }, images: Array<{ __typename?: 'Image', url: string }> } }> | null } | null, singles?: { __typename?: 'ArtistAlbumsConnection', edges?: Array<{ __typename?: 'ArtistAlbumEdge', node: { __typename?: 'Album', id: string, name: string, albumType: AlbumType, totalTracks: number, releaseDate: { __typename?: 'ReleaseDate', date: string }, images: Array<{ __typename?: 'Image', url: string }> } }> | null } | null, appearsOn?: { __typename?: 'ArtistAlbumsConnection', edges?: Array<{ __typename?: 'ArtistAlbumEdge', node: { __typename?: 'Album', id: string, name: string, albumType: AlbumType, totalTracks: number, releaseDate: { __typename?: 'ReleaseDate', date: string }, images: Array<{ __typename?: 'Image', url: string }> } }> | null } | null, followers: { __typename?: 'Followers', total: number }, images: Array<{ __typename?: 'Image', url: string }>, topTracks: Array<{ __typename?: 'Track', id: string, durationMs: number, explicit: boolean, name: string, album: { __typename?: 'Album', id: string, images: Array<{ __typename?: 'Image', url: string }> } }> } | null };

export type ArtistRouteQueryAlbumsFragment = { __typename?: 'ArtistAlbumsConnection', edges?: Array<{ __typename?: 'ArtistAlbumEdge', node: { __typename?: 'Album', id: string, name: string, albumType: AlbumType, totalTracks: number, releaseDate: { __typename?: 'ReleaseDate', date: string }, images: Array<{ __typename?: 'Image', url: string }> } }> | null };

export type CollectionAlbumsRouteQueryQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CollectionAlbumsRouteQueryQuery = { __typename?: 'Query', me?: { __typename?: 'CurrentUser', albums?: { __typename?: 'SavedAlbumsConnection', pageInfo: { __typename?: 'PageInfo', limit: number, offset: number, hasNextPage: boolean }, edges: Array<{ __typename?: 'SavedAlbumEdge', node: { __typename?: 'Album', id: string, name: string, albumType: AlbumType, totalTracks: number, releaseDate: { __typename?: 'ReleaseDate', date: string }, images: Array<{ __typename?: 'Image', url: string }> } }> } | null } | null };

export type CollectionArtistsRouteQueryQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type CollectionArtistsRouteQueryQuery = { __typename?: 'Query', me?: { __typename?: 'CurrentUser', followedArtists?: { __typename?: 'FollowedArtistsConnection', pageInfo: { __typename?: 'PageInfoCursorBased', cursors?: { __typename?: 'Cursors', after?: string | null } | null }, edges: Array<{ __typename?: 'FollowedArtistEdge', node: { __typename?: 'Artist', id: string, name: string, images: Array<{ __typename?: 'Image', url: string }> } }> } | null } | null };

export type CollectionPlaylistsRouteQueryQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CollectionPlaylistsRouteQueryQuery = { __typename?: 'Query', me?: { __typename?: 'CurrentUser', profile: { __typename?: 'CurrentUserProfile', id: string }, episodes?: { __typename?: 'SavedEpisodesConnection', pageInfo: { __typename?: 'PageInfo', total: number } } | null, tracks?: { __typename?: 'SavedTracksConnection', pageInfo: { __typename?: 'PageInfo', total: number }, edges: Array<{ __typename?: 'SavedTrackEdge', node: { __typename?: 'Track', id: string, name: string, artists: Array<{ __typename?: 'Artist', id: string, name: string }> } }> } | null, playlists?: { __typename?: 'PlaylistConnection', pageInfo: { __typename?: 'PageInfo', offset: number, limit: number, hasNextPage: boolean }, edges: Array<{ __typename?: 'PlaylistEdge', node: { __typename?: 'Playlist', id: string, name: string, description?: string | null, uri: string, images?: Array<{ __typename?: 'Image', url: string }> | null } }> } | null } | null };

export type CollectionPlaylistsRoutePaginatedQueryQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CollectionPlaylistsRoutePaginatedQueryQuery = { __typename?: 'Query', me?: { __typename?: 'CurrentUser', playlists?: { __typename?: 'PlaylistConnection', pageInfo: { __typename?: 'PageInfo', offset: number, limit: number, hasNextPage: boolean }, edges: Array<{ __typename?: 'PlaylistEdge', node: { __typename?: 'Playlist', id: string, name: string, description?: string | null, uri: string, images?: Array<{ __typename?: 'Image', url: string }> | null } }> } | null } | null };

export type CollectionPodcastsRouteQueryQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CollectionPodcastsRouteQueryQuery = { __typename?: 'Query', me?: { __typename?: 'CurrentUser', episodes?: { __typename?: 'SavedEpisodesConnection', pageInfo: { __typename?: 'PageInfo', total: number }, edges: Array<{ __typename?: 'SavedEpisodeEdge', node: { __typename?: 'Episode', id: string, name: string, show: { __typename?: 'Show', id: string, name: string } } }> } | null, shows?: { __typename?: 'SavedShowsConnection', pageInfo: { __typename?: 'PageInfo', offset: number, limit: number, hasNextPage: boolean }, edges: Array<{ __typename?: 'SavedShowEdge', node: { __typename?: 'Show', id: string, name: string, publisher: string, images: Array<{ __typename?: 'Image', url: string }> } }> } | null } | null };

export type CollectionPodcastsRoutePaginatedQueryQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CollectionPodcastsRoutePaginatedQueryQuery = { __typename?: 'Query', me?: { __typename?: 'CurrentUser', shows?: { __typename?: 'SavedShowsConnection', pageInfo: { __typename?: 'PageInfo', offset: number, limit: number, hasNextPage: boolean }, edges: Array<{ __typename?: 'SavedShowEdge', node: { __typename?: 'Show', id: string, name: string, publisher: string, images: Array<{ __typename?: 'Image', url: string }> } }> } | null } | null };

export type CollectionTracksRouteQueryQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CollectionTracksRouteQueryQuery = { __typename?: 'Query', me?: { __typename?: 'CurrentUser', profile: { __typename?: 'CurrentUserProfile', id: string, displayName?: string | null }, tracks?: { __typename?: 'SavedTracksConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, offset: number, limit: number, total: number }, edges: Array<{ __typename?: 'SavedTrackEdge', addedAt: any, node: { __typename?: 'Track', id: string, name: string, durationMs: number, uri: string, trackNumber?: number | null, explicit: boolean, album: { __typename?: 'Album', id: string, images: Array<{ __typename?: 'Image', url: string }> }, artists: Array<{ __typename?: 'Artist', id: string, name: string }> } }> } | null } | null };

export type CollectionTracksRoutePlaylistStateFragmentFragment = { __typename?: 'PlaybackState', isPlaying: boolean, context?: { __typename?: 'PlaybackContext', uri: string } | null };

export type CurrentUserFragmentFragment = { __typename?: 'CurrentUser', tracksContains?: Array<boolean> | null };

export type EpisodeRouteQueryQueryVariables = Exact<{
  episodeId: Scalars['ID']['input'];
}>;


export type EpisodeRouteQueryQuery = { __typename?: 'Query', episode?: { __typename?: 'Episode', id: string, name: string, durationMs: number, releaseDate: { __typename?: 'ReleaseDate', date: string, precision: ReleaseDatePrecision }, show: { __typename?: 'Show', id: string, name: string, images: Array<{ __typename?: 'Image', url: string, vibrantColor?: string | null }> }, resumePoint: { __typename?: 'ResumePoint', fullyPlayed: boolean, resumePositionMs: number } } | null };

export type IndexRouteQueryQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
}>;


export type IndexRouteQueryQuery = { __typename?: 'Query', me?: { __typename?: 'CurrentUser', playlists?: { __typename?: 'PlaylistConnection', edges: Array<{ __typename?: 'PlaylistEdge', node: { __typename?: 'Playlist', id: string, name: string, description?: string | null, uri: string, images?: Array<{ __typename?: 'Image', url: string }> | null } }> } | null } | null };

export type PlaylistQueryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type PlaylistQueryQuery = { __typename?: 'Query', me?: { __typename?: 'CurrentUser', profile: { __typename?: 'CurrentUserProfile', id: string } } | null, playlist?: { __typename?: 'Playlist', id: string, name: string, uri: string, images?: Array<{ __typename?: 'Image', url: string, vibrantColor?: string | null }> | null, owner: { __typename?: 'User', id: string, displayName?: string | null }, tracks: { __typename?: 'PlaylistTrackConnection', edges: Array<{ __typename?: 'PlaylistTrackEdge', addedAt?: any | null, node: { __typename?: 'Episode', id: string, name: string, durationMs: number, uri: string, explicit: boolean, releaseDate: { __typename?: 'ReleaseDate', date: string, precision: ReleaseDatePrecision }, show: { __typename?: 'Show', id: string, name: string, publisher: string, images: Array<{ __typename?: 'Image', url: string }> } } | { __typename?: 'Track', id: string, name: string, durationMs: number, uri: string, trackNumber?: number | null, explicit: boolean, album: { __typename?: 'Album', id: string, name: string, images: Array<{ __typename?: 'Image', url: string }> }, artists: Array<{ __typename?: 'Artist', id: string, name: string }> } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, offset: number, limit: number, total: number } } } | null };

export type PlaylistRoutePlaybackStateFragmentFragment = { __typename?: 'PlaybackState', isPlaying: boolean, context?: { __typename?: 'PlaybackContext', uri: string } | null };

export type QueueRouteQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type QueueRouteQueryQuery = { __typename?: 'Query', me?: { __typename?: 'CurrentUser', player: { __typename?: 'Player', playbackQueue?: { __typename?: 'PlaybackQueue', currentlyPlaying?: { __typename?: 'Episode', id: string, durationMs: number, uri: string, explicit: boolean, name: string, show: { __typename?: 'Show', id: string, name: string, publisher: string, images: Array<{ __typename?: 'Image', url: string }> } } | { __typename?: 'Track', id: string, durationMs: number, uri: string, trackNumber?: number | null, explicit: boolean, name: string, album: { __typename?: 'Album', id: string, name: string, images: Array<{ __typename?: 'Image', url: string }> }, artists: Array<{ __typename?: 'Artist', id: string, name: string }> } | null, queue: Array<{ __typename?: 'Episode', id: string, durationMs: number, uri: string, explicit: boolean, name: string, show: { __typename?: 'Show', id: string, name: string, publisher: string, images: Array<{ __typename?: 'Image', url: string }> } } | { __typename?: 'Track', id: string, durationMs: number, uri: string, trackNumber?: number | null, explicit: boolean, name: string, album: { __typename?: 'Album', id: string, name: string, images: Array<{ __typename?: 'Image', url: string }> }, artists: Array<{ __typename?: 'Artist', id: string, name: string }> }> } | null } } | null };

type QueueRoutePlaybackItemEpisodeFragment = { __typename?: 'Episode', id: string, durationMs: number, uri: string, explicit: boolean, name: string, show: { __typename?: 'Show', id: string, name: string, publisher: string, images: Array<{ __typename?: 'Image', url: string }> } };

type QueueRoutePlaybackItemTrackFragment = { __typename?: 'Track', id: string, durationMs: number, uri: string, trackNumber?: number | null, explicit: boolean, name: string, album: { __typename?: 'Album', id: string, name: string, images: Array<{ __typename?: 'Image', url: string }> }, artists: Array<{ __typename?: 'Artist', id: string, name: string }> };

export type QueueRoutePlaybackItemFragment = QueueRoutePlaybackItemEpisodeFragment | QueueRoutePlaybackItemTrackFragment;

export type QueueRoutePlaybackStateFragment = { __typename?: 'PlaybackState', isPlaying: boolean, context?: { __typename: 'PlaybackContext', uri: string } | null, item?: { __typename?: 'Episode', id: string } | { __typename?: 'Track', id: string } | null };

export type SearchRouteQueryQueryVariables = Exact<{
  q: Scalars['String']['input'];
  type: Array<SearchType> | SearchType;
}>;


export type SearchRouteQueryQuery = { __typename?: 'Query', search?: { __typename?: 'SearchResults', artists?: { __typename?: 'SearchArtistsConnection', edges: Array<{ __typename?: 'SearchArtistEdge', node: { __typename?: 'Artist', id: string, name: string, images: Array<{ __typename?: 'Image', url: string }> } }> } | null } | null };

export type SettingsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingsQueryQuery = { __typename?: 'Query', developer: { __typename?: 'Developer', fieldConfigs: Array<{ __typename?: 'FieldConfig', timeout: number, errorRate: any, schemaField: { __typename?: 'SchemaField', fieldName: string, typename: string } }> } };

export type LimitedIntrospectionQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type LimitedIntrospectionQueryQuery = { __typename?: 'Query', __schema: { __typename?: '__Schema', types: Array<{ __typename?: '__Type', name?: string | null, kind: TypeKind, fields?: Array<{ __typename?: '__Field', name: string, description?: string | null, type: { __typename?: '__Type', kind: TypeKind, name?: string | null, ofType?: { __typename?: '__Type', kind: TypeKind, name?: string | null, ofType?: { __typename?: '__Type', kind: TypeKind, name?: string | null, ofType?: { __typename?: '__Type', kind: TypeKind, name?: string | null, ofType?: { __typename?: '__Type', kind: TypeKind, name?: string | null, ofType?: { __typename?: '__Type', kind: TypeKind, name?: string | null, ofType?: { __typename?: '__Type', kind: TypeKind, name?: string | null, ofType?: { __typename?: '__Type', kind: TypeKind, name?: string | null } | null } | null } | null } | null } | null } | null } | null } }> | null }> } };

export type TypeRefFragment = { __typename?: '__Type', kind: TypeKind, name?: string | null, ofType?: { __typename?: '__Type', kind: TypeKind, name?: string | null, ofType?: { __typename?: '__Type', kind: TypeKind, name?: string | null, ofType?: { __typename?: '__Type', kind: TypeKind, name?: string | null, ofType?: { __typename?: '__Type', kind: TypeKind, name?: string | null, ofType?: { __typename?: '__Type', kind: TypeKind, name?: string | null, ofType?: { __typename?: '__Type', kind: TypeKind, name?: string | null, ofType?: { __typename?: '__Type', kind: TypeKind, name?: string | null } | null } | null } | null } | null } | null } | null } | null };

export type ShowRouteQueryQueryVariables = Exact<{
  showId: Scalars['ID']['input'];
}>;


export type ShowRouteQueryQuery = { __typename?: 'Query', show?: { __typename?: 'Show', id: string, description: string, name: string, publisher: string, episodes?: { __typename?: 'ShowEpisodesConnection', edges: Array<{ __typename?: 'ShowEpisodeEdge', node: { __typename?: 'Episode', id: string, name: string, durationMs: number, uri: string, releaseDate: { __typename?: 'ReleaseDate', date: string, precision: ReleaseDatePrecision }, resumePoint: { __typename?: 'ResumePoint', fullyPlayed: boolean, resumePositionMs: number } } }> } | null, images: Array<{ __typename?: 'Image', url: string, vibrantColor?: string | null }> } | null };

export type ShowRoutePlaybackStateFragment = { __typename?: 'PlaybackState', isPlaying: boolean, item?: { __typename: 'Episode', id: string, uri: string } | { __typename: 'Track', id: string, uri: string } | null };

export type TrackRouteQueryQueryVariables = Exact<{
  trackId: Scalars['ID']['input'];
}>;


export type TrackRouteQueryQuery = { __typename?: 'Query', track?: { __typename?: 'Track', id: string, durationMs: number, name: string, album: { __typename?: 'Album', id: string, albumType: AlbumType, name: string, uri: string, images: Array<{ __typename?: 'Image', url: string, vibrantColor?: string | null }>, tracks?: { __typename?: 'AlbumTrackConnection', edges: Array<{ __typename?: 'AlbumTrackEdge', node: { __typename?: 'Track', id: string, uri: string, durationMs: number, trackNumber?: number | null, name: string, explicit: boolean, artists: Array<{ __typename?: 'Artist', id: string, name: string }> } }> } | null }, artists: Array<{ __typename?: 'Artist', id: string, name: string, topTracks: Array<{ __typename?: 'Track', id: string, durationMs: number, explicit: boolean, name: string, album: { __typename?: 'Album', id: string, images: Array<{ __typename?: 'Image', url: string }> } }>, images: Array<{ __typename?: 'Image', url: string }> }> } | null };

export const AlbumTrackTitleCellPlaybackStateFragmentDoc = gql`
    fragment AlbumTrackTitleCell_playbackState on PlaybackState {
  context {
    uri
  }
  item {
    id
    uri
  }
}
    `;
export const AlbumTrackTitleCellTrackFragmentDoc = gql`
    fragment AlbumTrackTitleCell_track on Track {
  id
  name
  uri
  explicit
  artists {
    id
    name
  }
}
    `;
export const AlbumTrackTitleCellAlbumFragmentDoc = gql`
    fragment AlbumTrackTitleCell_album on Album {
  id
  uri
}
    `;
export const AlbumTracksTableAlbumFragmentDoc = gql`
    fragment AlbumTracksTable_album on Album {
  id
  uri
  tracks {
    edges {
      node {
        id
        uri
        durationMs
        trackNumber
        artists {
          id
        }
        ...AlbumTrackTitleCell_track
      }
    }
  }
  ...AlbumTrackTitleCell_album
}
    ${AlbumTrackTitleCellTrackFragmentDoc}
${AlbumTrackTitleCellAlbumFragmentDoc}`;
export const ArtistTileArtistFragmentDoc = gql`
    fragment ArtistTile_artist on Artist {
  id
  name
  images {
    url
  }
}
    `;
export const ArtistTopTracksTracksFragmentDoc = gql`
    fragment ArtistTopTracks_tracks on Track {
  id
  durationMs
  explicit
  name
  album {
    id
    images {
      url
    }
  }
}
    `;
export const AvatarProfileFragmentDoc = gql`
    fragment Avatar_profile on UserProfile {
  id
  images {
    url
  }
}
    `;
export const DevicePopoverPlaybackStateFragmentDoc = gql`
    fragment DevicePopover_playbackState on PlaybackState {
  isPlaying
  device {
    id
  }
}
    `;
export const DevicePopoverDevicesFragmentDoc = gql`
    fragment DevicePopover_devices on Device {
  id
  name
  type
}
    `;
export const EpisodeRemainingDurationEpisodeFragmentDoc = gql`
    fragment EpisodeRemainingDuration_episode on Episode {
  id
  durationMs
  resumePoint {
    fullyPlayed
    resumePositionMs
  }
}
    `;
export const LikedSongsTilePlaybackStateFragmentDoc = gql`
    fragment LikedSongsTile_playbackState on PlaybackState {
  isPlaying
  context {
    uri
  }
}
    `;
export const LikedSongsTileConnectionFragmentDoc = gql`
    fragment LikedSongsTile_connection on SavedTracksConnection {
  pageInfo {
    total
  }
  edges {
    node {
      id
      name
      artists {
        id
        name
      }
    }
  }
}
    `;
export const NotificationManagerPlaybackStateFragmentDoc = gql`
    fragment NotificationManager_playbackState on PlaybackState {
  device {
    id
  }
}
    `;
export const TrackPlaybackDetailsContextFragmentDoc = gql`
    fragment TrackPlaybackDetails_context on PlaybackContext {
  uri
  type
}
    `;
export const TrackPlaybackDetailsTrackFragmentDoc = gql`
    fragment TrackPlaybackDetails_track on Track {
  id
  name
  uri
  album {
    id
    name
  }
  artists {
    id
    uri
    name
  }
}
    `;
export const EpisodePlaybackDetailsEpisodeFragmentDoc = gql`
    fragment EpisodePlaybackDetails_episode on Episode {
  id
  name
  show {
    id
    name
  }
}
    `;
export const LikeControlPlaybackItemFragmentDoc = gql`
    fragment LikeControl_playbackItem on PlaybackItem {
  __typename
  id
}
    `;
export const PlaybackItemProgressBarPlaybackStateFragmentDoc = gql`
    fragment PlaybackItemProgressBar_playbackState on PlaybackState {
  isPlaying
  progressMs
  timestamp
  item {
    id
    durationMs
  }
}
    `;
export const PlaybarPlaybackStateFragmentDoc = gql`
    fragment Playbar_playbackState on PlaybackState {
  isPlaying
  repeatState
  shuffleState
  actions {
    disallows
  }
  context {
    ...TrackPlaybackDetails_context
  }
  device {
    id
    name
    type
    volumePercent
  }
  item {
    id
    ... on Track {
      album {
        id
        images {
          url
        }
      }
      ...TrackPlaybackDetails_track
    }
    ... on Episode {
      show {
        id
        images {
          url
        }
      }
      ...EpisodePlaybackDetails_episode
    }
    ...LikeControl_playbackItem
  }
  ...PlaybackItemProgressBar_playbackState
}
    ${TrackPlaybackDetailsContextFragmentDoc}
${TrackPlaybackDetailsTrackFragmentDoc}
${EpisodePlaybackDetailsEpisodeFragmentDoc}
${LikeControlPlaybackItemFragmentDoc}
${PlaybackItemProgressBarPlaybackStateFragmentDoc}`;
export const PlaybackStateFragmentFragmentDoc = gql`
    fragment PlaybackStateFragment on PlaybackState {
  isPlaying
  repeatState
  shuffleState
  actions {
    disallows
  }
  context {
    uri
  }
  device {
    id
    name
    type
    volumePercent
  }
  item {
    id
    ... on Track {
      album {
        id
        images {
          url
        }
      }
    }
    ... on Episode {
      show {
        id
        images {
          url
        }
      }
    }
  }
  ...Playbar_playbackState
}
    ${PlaybarPlaybackStateFragmentDoc}`;
export const PlaylistSidebarLinkPlaybackStateFragmentDoc = gql`
    fragment PlaylistSidebarLink_playbackState on PlaybackState {
  isPlaying
  context {
    uri
  }
}
    `;
export const PlaylistSidebarLinkCurrentUserFragmentDoc = gql`
    fragment PlaylistSidebarLink_currentUser on CurrentUser {
  profile {
    id
  }
}
    `;
export const PlaylistSidebarLinkPlaylistFragmentDoc = gql`
    fragment PlaylistSidebarLink_playlist on Playlist {
  id
  uri
  name
  owner {
    id
    displayName
  }
}
    `;
export const PlaylistTilePlaylistFragmentDoc = gql`
    fragment PlaylistTile_playlist on Playlist {
  id
  name
  description
  uri
  images {
    url
  }
}
    `;
export const PlaylistTitleCellPlaybackStateFragmentDoc = gql`
    fragment PlaylistTitleCell_playbackState on PlaybackState {
  context {
    uri
  }
  item {
    id
    uri
  }
}
    `;
export const PlaylistTitleCellPlaylistFragmentDoc = gql`
    fragment PlaylistTitleCell_playlist on Playlist {
  id
  uri
}
    `;
export const PlaylistTitleCellPlaylistTrackFragmentDoc = gql`
    fragment PlaylistTitleCell_playlistTrack on PlaylistTrack {
  id
  name
  uri
  ... on Episode {
    explicit
    show {
      id
      publisher
      images {
        url
      }
    }
  }
  ... on Track {
    explicit
    artists {
      id
      name
    }
    album {
      id
      name
      images {
        url
      }
    }
  }
}
    `;
export const TrackNumberCellPlaybackStateFragmentDoc = gql`
    fragment TrackNumberCell_playbackState on PlaybackState {
  isPlaying
  context {
    uri
  }
  item {
    id
    uri
  }
}
    `;
export const TrackTitleCellPlaybackStateFragmentDoc = gql`
    fragment TrackTitleCell_playbackState on PlaybackState {
  context {
    uri
  }
  item {
    id
    uri
  }
}
    `;
export const YourEpisodesTileConnectionFragmentDoc = gql`
    fragment YourEpisodesTile_connection on SavedEpisodesConnection {
  pageInfo {
    total
  }
  edges {
    node {
      id
      name
      show {
        id
        name
      }
    }
  }
}
    `;
export const SavedTracksContainsFragmentFragmentDoc = gql`
    fragment SavedTracksContainsFragment on CurrentUser {
  tracksContains(ids: $ids)
}
    `;
export const RemovedSavedAlbumsMutationFragmentFragmentDoc = gql`
    fragment RemovedSavedAlbumsMutationFragment on CurrentUser {
  albumsContains(ids: $ids)
}
    `;
export const RemovedSavedTracksMutationFragmentFragmentDoc = gql`
    fragment RemovedSavedTracksMutationFragment on CurrentUser {
  tracksContains(ids: $ids)
}
    `;
export const UseResumePlaybackStateFragmentFragmentDoc = gql`
    fragment UseResumePlaybackStateFragment on PlaybackState {
  context {
    uri
    type
  }
}
    `;
export const SaveAlbumsMutationFragmentFragmentDoc = gql`
    fragment SaveAlbumsMutationFragment on CurrentUser {
  albumsContains(ids: $ids)
}
    `;
export const SaveTracksMutationFragmentFragmentDoc = gql`
    fragment SaveTracksMutationFragment on CurrentUser {
  tracksContains(ids: $ids)
}
    `;
export const SetVolumeCacheFragmentFragmentDoc = gql`
    fragment SetVolumeCacheFragment on PlaybackState {
  device {
    id
    volumePercent
  }
}
    `;
export const AlbumRoutePlaybackStateFragmentFragmentDoc = gql`
    fragment AlbumRoutePlaybackStateFragment on PlaybackState {
  isPlaying
  context {
    uri
  }
}
    `;
export const AlbumTileAlbumFragmentDoc = gql`
    fragment AlbumTile_album on Album {
  id
  name
  albumType
  totalTracks
  releaseDate {
    date
  }
  images {
    url
  }
}
    `;
export const ArtistRouteQueryAlbumsFragmentDoc = gql`
    fragment ArtistRouteQuery_albums on ArtistAlbumsConnection {
  edges {
    node {
      id
      ...AlbumTile_album
    }
  }
}
    ${AlbumTileAlbumFragmentDoc}`;
export const CollectionTracksRoutePlaylistStateFragmentFragmentDoc = gql`
    fragment CollectionTracksRoutePlaylistStateFragment on PlaybackState {
  isPlaying
  context {
    uri
  }
}
    `;
export const CurrentUserFragmentFragmentDoc = gql`
    fragment CurrentUserFragment on CurrentUser {
  tracksContains(ids: $ids)
}
    `;
export const PlaylistRoutePlaybackStateFragmentFragmentDoc = gql`
    fragment PlaylistRoutePlaybackStateFragment on PlaybackState {
  isPlaying
  context {
    uri
  }
}
    `;
export const TrackNumberCellTrackFragmentDoc = gql`
    fragment TrackNumberCell_track on Track {
  id
  uri
  trackNumber
}
    `;
export const TrackTitleCellTrackFragmentDoc = gql`
    fragment TrackTitleCell_track on Track {
  id
  explicit
  name
  uri
  album {
    id
    images {
      url
    }
  }
  artists {
    id
    name
  }
}
    `;
export const EpisodeDetailsCellEpisodeFragmentDoc = gql`
    fragment EpisodeDetailsCell_episode on Episode {
  id
  explicit
  name
  show {
    id
    publisher
    images {
      url
    }
  }
}
    `;
export const QueueRoutePlaybackItemFragmentDoc = gql`
    fragment QueueRoute_playbackItem on PlaybackItem {
  id
  durationMs
  uri
  ... on Track {
    album {
      id
      name
    }
    ...TrackNumberCell_track
    ...TrackTitleCell_track
  }
  ... on Episode {
    show {
      id
      name
    }
    ...EpisodeDetailsCell_episode
  }
}
    ${TrackNumberCellTrackFragmentDoc}
${TrackTitleCellTrackFragmentDoc}
${EpisodeDetailsCellEpisodeFragmentDoc}`;
export const QueueRoutePlaybackStateFragmentDoc = gql`
    fragment QueueRoute_playbackState on PlaybackState {
  isPlaying
  context {
    __typename
    uri
  }
  item {
    id
  }
}
    `;
export const TypeRefFragmentDoc = gql`
    fragment TypeRef on __Type {
  kind
  name
  ofType {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
              }
            }
          }
        }
      }
    }
  }
}
    `;
export const ShowRoutePlaybackStateFragmentDoc = gql`
    fragment ShowRoute_playbackState on PlaybackState {
  isPlaying
  item {
    __typename
    id
    uri
  }
}
    `;
export const AddToPlaylistQueryDocument = gql`
    query AddToPlaylistQuery($offset: Int, $limit: Int) {
  me {
    playlists(offset: $offset, limit: $limit) @connection(key: "addToPlaylistPlaylists") {
      pageInfo {
        hasNextPage
        limit
        offset
      }
      edges {
        node {
          id
          name
        }
      }
    }
  }
}
    `;

/**
 * __useAddToPlaylistQueryQuery__
 *
 * To run a query within a React component, call `useAddToPlaylistQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useAddToPlaylistQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddToPlaylistQueryQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useAddToPlaylistQueryQuery(baseOptions?: Apollo.QueryHookOptions<AddToPlaylistQueryQuery, AddToPlaylistQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AddToPlaylistQueryQuery, AddToPlaylistQueryQueryVariables>(AddToPlaylistQueryDocument, options);
      }
export function useAddToPlaylistQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AddToPlaylistQueryQuery, AddToPlaylistQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AddToPlaylistQueryQuery, AddToPlaylistQueryQueryVariables>(AddToPlaylistQueryDocument, options);
        }
export function useAddToPlaylistQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AddToPlaylistQueryQuery, AddToPlaylistQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AddToPlaylistQueryQuery, AddToPlaylistQueryQueryVariables>(AddToPlaylistQueryDocument, options);
        }
export type AddToPlaylistQueryQueryHookResult = ReturnType<typeof useAddToPlaylistQueryQuery>;
export type AddToPlaylistQueryLazyQueryHookResult = ReturnType<typeof useAddToPlaylistQueryLazyQuery>;
export type AddToPlaylistQuerySuspenseQueryHookResult = ReturnType<typeof useAddToPlaylistQuerySuspenseQuery>;
export type AddToPlaylistQueryQueryResult = Apollo.QueryResult<AddToPlaylistQueryQuery, AddToPlaylistQueryQueryVariables>;
export const CurrentUserQueryDocument = gql`
    query CurrentUserQuery {
  me {
    profile {
      id
      displayName
      ...Avatar_profile
    }
  }
}
    ${AvatarProfileFragmentDoc}`;

/**
 * __useCurrentUserQueryQuery__
 *
 * To run a query within a React component, call `useCurrentUserQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQueryQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQueryQuery, CurrentUserQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQueryQuery, CurrentUserQueryQueryVariables>(CurrentUserQueryDocument, options);
      }
export function useCurrentUserQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQueryQuery, CurrentUserQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQueryQuery, CurrentUserQueryQueryVariables>(CurrentUserQueryDocument, options);
        }
export function useCurrentUserQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CurrentUserQueryQuery, CurrentUserQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CurrentUserQueryQuery, CurrentUserQueryQueryVariables>(CurrentUserQueryDocument, options);
        }
export type CurrentUserQueryQueryHookResult = ReturnType<typeof useCurrentUserQueryQuery>;
export type CurrentUserQueryLazyQueryHookResult = ReturnType<typeof useCurrentUserQueryLazyQuery>;
export type CurrentUserQuerySuspenseQueryHookResult = ReturnType<typeof useCurrentUserQuerySuspenseQuery>;
export type CurrentUserQueryQueryResult = Apollo.QueryResult<CurrentUserQueryQuery, CurrentUserQueryQueryVariables>;
export const LikeControlQueryDocument = gql`
    query LikeControlQuery($ids: [ID!]!) {
  me {
    episodesContains(ids: $ids)
    tracksContains(ids: $ids)
  }
}
    `;

/**
 * __useLikeControlQueryQuery__
 *
 * To run a query within a React component, call `useLikeControlQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useLikeControlQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLikeControlQueryQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useLikeControlQueryQuery(baseOptions: Apollo.QueryHookOptions<LikeControlQueryQuery, LikeControlQueryQueryVariables> & ({ variables: LikeControlQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LikeControlQueryQuery, LikeControlQueryQueryVariables>(LikeControlQueryDocument, options);
      }
export function useLikeControlQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LikeControlQueryQuery, LikeControlQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LikeControlQueryQuery, LikeControlQueryQueryVariables>(LikeControlQueryDocument, options);
        }
export function useLikeControlQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LikeControlQueryQuery, LikeControlQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LikeControlQueryQuery, LikeControlQueryQueryVariables>(LikeControlQueryDocument, options);
        }
export type LikeControlQueryQueryHookResult = ReturnType<typeof useLikeControlQueryQuery>;
export type LikeControlQueryLazyQueryHookResult = ReturnType<typeof useLikeControlQueryLazyQuery>;
export type LikeControlQuerySuspenseQueryHookResult = ReturnType<typeof useLikeControlQuerySuspenseQuery>;
export type LikeControlQueryQueryResult = Apollo.QueryResult<LikeControlQueryQuery, LikeControlQueryQueryVariables>;
export const SidebarQueryDocument = gql`
    query SidebarQuery($offset: Int, $limit: Int) {
  me {
    profile {
      id
    }
    playlists(offset: $offset, limit: $limit) @connection(key: "rootPlaylists") {
      pageInfo {
        offset
        limit
        hasNextPage
      }
      edges {
        node {
          id
          images {
            url
          }
          ...PlaylistSidebarLink_playlist
        }
      }
    }
  }
}
    ${PlaylistSidebarLinkPlaylistFragmentDoc}`;

/**
 * __useSidebarQueryQuery__
 *
 * To run a query within a React component, call `useSidebarQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useSidebarQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSidebarQueryQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useSidebarQueryQuery(baseOptions?: Apollo.QueryHookOptions<SidebarQueryQuery, SidebarQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SidebarQueryQuery, SidebarQueryQueryVariables>(SidebarQueryDocument, options);
      }
export function useSidebarQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SidebarQueryQuery, SidebarQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SidebarQueryQuery, SidebarQueryQueryVariables>(SidebarQueryDocument, options);
        }
export function useSidebarQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SidebarQueryQuery, SidebarQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SidebarQueryQuery, SidebarQueryQueryVariables>(SidebarQueryDocument, options);
        }
export type SidebarQueryQueryHookResult = ReturnType<typeof useSidebarQueryQuery>;
export type SidebarQueryLazyQueryHookResult = ReturnType<typeof useSidebarQueryLazyQuery>;
export type SidebarQuerySuspenseQueryHookResult = ReturnType<typeof useSidebarQuerySuspenseQuery>;
export type SidebarQueryQueryResult = Apollo.QueryResult<SidebarQueryQuery, SidebarQueryQueryVariables>;
export const PlaybackStateSubscriberQueryDocument = gql`
    query PlaybackStateSubscriberQuery {
  me {
    player {
      playbackState {
        ...PlaybackStateFragment
      }
    }
  }
}
    ${PlaybackStateFragmentFragmentDoc}`;

/**
 * __usePlaybackStateSubscriberQueryQuery__
 *
 * To run a query within a React component, call `usePlaybackStateSubscriberQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlaybackStateSubscriberQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlaybackStateSubscriberQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function usePlaybackStateSubscriberQueryQuery(baseOptions?: Apollo.QueryHookOptions<PlaybackStateSubscriberQueryQuery, PlaybackStateSubscriberQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlaybackStateSubscriberQueryQuery, PlaybackStateSubscriberQueryQueryVariables>(PlaybackStateSubscriberQueryDocument, options);
      }
export function usePlaybackStateSubscriberQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlaybackStateSubscriberQueryQuery, PlaybackStateSubscriberQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlaybackStateSubscriberQueryQuery, PlaybackStateSubscriberQueryQueryVariables>(PlaybackStateSubscriberQueryDocument, options);
        }
export function usePlaybackStateSubscriberQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PlaybackStateSubscriberQueryQuery, PlaybackStateSubscriberQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PlaybackStateSubscriberQueryQuery, PlaybackStateSubscriberQueryQueryVariables>(PlaybackStateSubscriberQueryDocument, options);
        }
export type PlaybackStateSubscriberQueryQueryHookResult = ReturnType<typeof usePlaybackStateSubscriberQueryQuery>;
export type PlaybackStateSubscriberQueryLazyQueryHookResult = ReturnType<typeof usePlaybackStateSubscriberQueryLazyQuery>;
export type PlaybackStateSubscriberQuerySuspenseQueryHookResult = ReturnType<typeof usePlaybackStateSubscriberQuerySuspenseQuery>;
export type PlaybackStateSubscriberQueryQueryResult = Apollo.QueryResult<PlaybackStateSubscriberQueryQuery, PlaybackStateSubscriberQueryQueryVariables>;
export const PlaybackStateSubscriberSubscriptionDocument = gql`
    subscription PlaybackStateSubscriberSubscription {
  playbackStateChanged {
    ...PlaybackStateFragment
  }
}
    ${PlaybackStateFragmentFragmentDoc}`;

/**
 * __usePlaybackStateSubscriberSubscriptionSubscription__
 *
 * To run a query within a React component, call `usePlaybackStateSubscriberSubscriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePlaybackStateSubscriberSubscriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlaybackStateSubscriberSubscriptionSubscription({
 *   variables: {
 *   },
 * });
 */
export function usePlaybackStateSubscriberSubscriptionSubscription(baseOptions?: Apollo.SubscriptionHookOptions<PlaybackStateSubscriberSubscriptionSubscription, PlaybackStateSubscriberSubscriptionSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<PlaybackStateSubscriberSubscriptionSubscription, PlaybackStateSubscriberSubscriptionSubscriptionVariables>(PlaybackStateSubscriberSubscriptionDocument, options);
      }
export type PlaybackStateSubscriberSubscriptionSubscriptionHookResult = ReturnType<typeof usePlaybackStateSubscriberSubscriptionSubscription>;
export type PlaybackStateSubscriberSubscriptionSubscriptionResult = Apollo.SubscriptionResult<PlaybackStateSubscriberSubscriptionSubscription>;
export const PlaybarQueryDocument = gql`
    query PlaybarQuery {
  me {
    player {
      devices {
        id
        ...DevicePopover_devices
      }
    }
  }
}
    ${DevicePopoverDevicesFragmentDoc}`;

/**
 * __usePlaybarQueryQuery__
 *
 * To run a query within a React component, call `usePlaybarQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlaybarQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlaybarQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function usePlaybarQueryQuery(baseOptions?: Apollo.QueryHookOptions<PlaybarQueryQuery, PlaybarQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlaybarQueryQuery, PlaybarQueryQueryVariables>(PlaybarQueryDocument, options);
      }
export function usePlaybarQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlaybarQueryQuery, PlaybarQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlaybarQueryQuery, PlaybarQueryQueryVariables>(PlaybarQueryDocument, options);
        }
export function usePlaybarQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PlaybarQueryQuery, PlaybarQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PlaybarQueryQuery, PlaybarQueryQueryVariables>(PlaybarQueryDocument, options);
        }
export type PlaybarQueryQueryHookResult = ReturnType<typeof usePlaybarQueryQuery>;
export type PlaybarQueryLazyQueryHookResult = ReturnType<typeof usePlaybarQueryLazyQuery>;
export type PlaybarQuerySuspenseQueryHookResult = ReturnType<typeof usePlaybarQuerySuspenseQuery>;
export type PlaybarQueryQueryResult = Apollo.QueryResult<PlaybarQueryQuery, PlaybarQueryQueryVariables>;
export const PlaylistDetailsModalQueryDocument = gql`
    query PlaylistDetailsModalQuery($id: ID!) {
  playlist(id: $id) {
    id
    name
    description
    images {
      url
    }
  }
}
    `;

/**
 * __usePlaylistDetailsModalQueryQuery__
 *
 * To run a query within a React component, call `usePlaylistDetailsModalQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlaylistDetailsModalQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlaylistDetailsModalQueryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePlaylistDetailsModalQueryQuery(baseOptions: Apollo.QueryHookOptions<PlaylistDetailsModalQueryQuery, PlaylistDetailsModalQueryQueryVariables> & ({ variables: PlaylistDetailsModalQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlaylistDetailsModalQueryQuery, PlaylistDetailsModalQueryQueryVariables>(PlaylistDetailsModalQueryDocument, options);
      }
export function usePlaylistDetailsModalQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlaylistDetailsModalQueryQuery, PlaylistDetailsModalQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlaylistDetailsModalQueryQuery, PlaylistDetailsModalQueryQueryVariables>(PlaylistDetailsModalQueryDocument, options);
        }
export function usePlaylistDetailsModalQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PlaylistDetailsModalQueryQuery, PlaylistDetailsModalQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PlaylistDetailsModalQueryQuery, PlaylistDetailsModalQueryQueryVariables>(PlaylistDetailsModalQueryDocument, options);
        }
export type PlaylistDetailsModalQueryQueryHookResult = ReturnType<typeof usePlaylistDetailsModalQueryQuery>;
export type PlaylistDetailsModalQueryLazyQueryHookResult = ReturnType<typeof usePlaylistDetailsModalQueryLazyQuery>;
export type PlaylistDetailsModalQuerySuspenseQueryHookResult = ReturnType<typeof usePlaylistDetailsModalQuerySuspenseQuery>;
export type PlaylistDetailsModalQueryQueryResult = Apollo.QueryResult<PlaylistDetailsModalQueryQuery, PlaylistDetailsModalQueryQueryVariables>;
export const SavedTracksContainsQueryDocument = gql`
    query SavedTracksContainsQuery($ids: [ID!]!) {
  me {
    tracksContains(ids: $ids)
  }
}
    `;

/**
 * __useSavedTracksContainsQueryQuery__
 *
 * To run a query within a React component, call `useSavedTracksContainsQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useSavedTracksContainsQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSavedTracksContainsQueryQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useSavedTracksContainsQueryQuery(baseOptions: Apollo.QueryHookOptions<SavedTracksContainsQueryQuery, SavedTracksContainsQueryQueryVariables> & ({ variables: SavedTracksContainsQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SavedTracksContainsQueryQuery, SavedTracksContainsQueryQueryVariables>(SavedTracksContainsQueryDocument, options);
      }
export function useSavedTracksContainsQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SavedTracksContainsQueryQuery, SavedTracksContainsQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SavedTracksContainsQueryQuery, SavedTracksContainsQueryQueryVariables>(SavedTracksContainsQueryDocument, options);
        }
export function useSavedTracksContainsQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SavedTracksContainsQueryQuery, SavedTracksContainsQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SavedTracksContainsQueryQuery, SavedTracksContainsQueryQueryVariables>(SavedTracksContainsQueryDocument, options);
        }
export type SavedTracksContainsQueryQueryHookResult = ReturnType<typeof useSavedTracksContainsQueryQuery>;
export type SavedTracksContainsQueryLazyQueryHookResult = ReturnType<typeof useSavedTracksContainsQueryLazyQuery>;
export type SavedTracksContainsQuerySuspenseQueryHookResult = ReturnType<typeof useSavedTracksContainsQuerySuspenseQuery>;
export type SavedTracksContainsQueryQueryResult = Apollo.QueryResult<SavedTracksContainsQueryQuery, SavedTracksContainsQueryQueryVariables>;
export const AddToPlaylistMutationDocument = gql`
    mutation AddToPlaylistMutation($input: AddItemsToPlaylistInput!) {
  addItemsToPlaylist(input: $input) {
    playlist {
      id
    }
  }
}
    `;
export type AddToPlaylistMutationMutationFn = Apollo.MutationFunction<AddToPlaylistMutationMutation, AddToPlaylistMutationMutationVariables>;

/**
 * __useAddToPlaylistMutationMutation__
 *
 * To run a mutation, you first call `useAddToPlaylistMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToPlaylistMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToPlaylistMutationMutation, { data, loading, error }] = useAddToPlaylistMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddToPlaylistMutationMutation(baseOptions?: Apollo.MutationHookOptions<AddToPlaylistMutationMutation, AddToPlaylistMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddToPlaylistMutationMutation, AddToPlaylistMutationMutationVariables>(AddToPlaylistMutationDocument, options);
      }
export type AddToPlaylistMutationMutationHookResult = ReturnType<typeof useAddToPlaylistMutationMutation>;
export type AddToPlaylistMutationMutationResult = Apollo.MutationResult<AddToPlaylistMutationMutation>;
export type AddToPlaylistMutationMutationOptions = Apollo.BaseMutationOptions<AddToPlaylistMutationMutation, AddToPlaylistMutationMutationVariables>;
export const AddToQueueMutationDocument = gql`
    mutation AddToQueueMutation($input: AddItemToPlaybackQueueInput!) {
  addItemToPlaybackQueue(input: $input) {
    playbackQueue {
      currentlyPlaying {
        __typename
        id
      }
    }
  }
}
    `;
export type AddToQueueMutationMutationFn = Apollo.MutationFunction<AddToQueueMutationMutation, AddToQueueMutationMutationVariables>;

/**
 * __useAddToQueueMutationMutation__
 *
 * To run a mutation, you first call `useAddToQueueMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToQueueMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToQueueMutationMutation, { data, loading, error }] = useAddToQueueMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddToQueueMutationMutation(baseOptions?: Apollo.MutationHookOptions<AddToQueueMutationMutation, AddToQueueMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddToQueueMutationMutation, AddToQueueMutationMutationVariables>(AddToQueueMutationDocument, options);
      }
export type AddToQueueMutationMutationHookResult = ReturnType<typeof useAddToQueueMutationMutation>;
export type AddToQueueMutationMutationResult = Apollo.MutationResult<AddToQueueMutationMutation>;
export type AddToQueueMutationMutationOptions = Apollo.BaseMutationOptions<AddToQueueMutationMutation, AddToQueueMutationMutationVariables>;
export const CreatePlaylistDocument = gql`
    mutation CreatePlaylist($input: CreatePlaylistInput!) {
  createPlaylist(input: $input) {
    playlist {
      id
      name
      description
      public
    }
  }
}
    `;
export type CreatePlaylistMutationFn = Apollo.MutationFunction<CreatePlaylistMutation, CreatePlaylistMutationVariables>;

/**
 * __useCreatePlaylistMutation__
 *
 * To run a mutation, you first call `useCreatePlaylistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlaylistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlaylistMutation, { data, loading, error }] = useCreatePlaylistMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePlaylistMutation(baseOptions?: Apollo.MutationHookOptions<CreatePlaylistMutation, CreatePlaylistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePlaylistMutation, CreatePlaylistMutationVariables>(CreatePlaylistDocument, options);
      }
export type CreatePlaylistMutationHookResult = ReturnType<typeof useCreatePlaylistMutation>;
export type CreatePlaylistMutationResult = Apollo.MutationResult<CreatePlaylistMutation>;
export type CreatePlaylistMutationOptions = Apollo.BaseMutationOptions<CreatePlaylistMutation, CreatePlaylistMutationVariables>;
export const PausePlaybackMutationDocument = gql`
    mutation PausePlaybackMutation {
  pausePlayback {
    playbackState {
      isPlaying
    }
  }
}
    `;
export type PausePlaybackMutationMutationFn = Apollo.MutationFunction<PausePlaybackMutationMutation, PausePlaybackMutationMutationVariables>;

/**
 * __usePausePlaybackMutationMutation__
 *
 * To run a mutation, you first call `usePausePlaybackMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePausePlaybackMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pausePlaybackMutationMutation, { data, loading, error }] = usePausePlaybackMutationMutation({
 *   variables: {
 *   },
 * });
 */
export function usePausePlaybackMutationMutation(baseOptions?: Apollo.MutationHookOptions<PausePlaybackMutationMutation, PausePlaybackMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PausePlaybackMutationMutation, PausePlaybackMutationMutationVariables>(PausePlaybackMutationDocument, options);
      }
export type PausePlaybackMutationMutationHookResult = ReturnType<typeof usePausePlaybackMutationMutation>;
export type PausePlaybackMutationMutationResult = Apollo.MutationResult<PausePlaybackMutationMutation>;
export type PausePlaybackMutationMutationOptions = Apollo.BaseMutationOptions<PausePlaybackMutationMutation, PausePlaybackMutationMutationVariables>;
export const RemoveFromPlaylistMutationDocument = gql`
    mutation RemoveFromPlaylistMutation($input: RemoveItemFromPlaylistInput!) {
  removeItemFromPlaylist(input: $input) {
    playlist {
      id
    }
  }
}
    `;
export type RemoveFromPlaylistMutationMutationFn = Apollo.MutationFunction<RemoveFromPlaylistMutationMutation, RemoveFromPlaylistMutationMutationVariables>;

/**
 * __useRemoveFromPlaylistMutationMutation__
 *
 * To run a mutation, you first call `useRemoveFromPlaylistMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFromPlaylistMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFromPlaylistMutationMutation, { data, loading, error }] = useRemoveFromPlaylistMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveFromPlaylistMutationMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFromPlaylistMutationMutation, RemoveFromPlaylistMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveFromPlaylistMutationMutation, RemoveFromPlaylistMutationMutationVariables>(RemoveFromPlaylistMutationDocument, options);
      }
export type RemoveFromPlaylistMutationMutationHookResult = ReturnType<typeof useRemoveFromPlaylistMutationMutation>;
export type RemoveFromPlaylistMutationMutationResult = Apollo.MutationResult<RemoveFromPlaylistMutationMutation>;
export type RemoveFromPlaylistMutationMutationOptions = Apollo.BaseMutationOptions<RemoveFromPlaylistMutationMutation, RemoveFromPlaylistMutationMutationVariables>;
export const RemoveSavedAlbumsMutationDocument = gql`
    mutation RemoveSavedAlbumsMutation($input: RemoveSavedAlbumsInput!) {
  removeSavedAlbums(input: $input) {
    removedAlbums {
      id
    }
  }
}
    `;
export type RemoveSavedAlbumsMutationMutationFn = Apollo.MutationFunction<RemoveSavedAlbumsMutationMutation, RemoveSavedAlbumsMutationMutationVariables>;

/**
 * __useRemoveSavedAlbumsMutationMutation__
 *
 * To run a mutation, you first call `useRemoveSavedAlbumsMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSavedAlbumsMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSavedAlbumsMutationMutation, { data, loading, error }] = useRemoveSavedAlbumsMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveSavedAlbumsMutationMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSavedAlbumsMutationMutation, RemoveSavedAlbumsMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSavedAlbumsMutationMutation, RemoveSavedAlbumsMutationMutationVariables>(RemoveSavedAlbumsMutationDocument, options);
      }
export type RemoveSavedAlbumsMutationMutationHookResult = ReturnType<typeof useRemoveSavedAlbumsMutationMutation>;
export type RemoveSavedAlbumsMutationMutationResult = Apollo.MutationResult<RemoveSavedAlbumsMutationMutation>;
export type RemoveSavedAlbumsMutationMutationOptions = Apollo.BaseMutationOptions<RemoveSavedAlbumsMutationMutation, RemoveSavedAlbumsMutationMutationVariables>;
export const RemoveSavedTracksMutationDocument = gql`
    mutation RemoveSavedTracksMutation($input: RemoveSavedTracksInput!) {
  removeSavedTracks(input: $input) {
    removedTracks {
      id
    }
  }
}
    `;
export type RemoveSavedTracksMutationMutationFn = Apollo.MutationFunction<RemoveSavedTracksMutationMutation, RemoveSavedTracksMutationMutationVariables>;

/**
 * __useRemoveSavedTracksMutationMutation__
 *
 * To run a mutation, you first call `useRemoveSavedTracksMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSavedTracksMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSavedTracksMutationMutation, { data, loading, error }] = useRemoveSavedTracksMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveSavedTracksMutationMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSavedTracksMutationMutation, RemoveSavedTracksMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSavedTracksMutationMutation, RemoveSavedTracksMutationMutationVariables>(RemoveSavedTracksMutationDocument, options);
      }
export type RemoveSavedTracksMutationMutationHookResult = ReturnType<typeof useRemoveSavedTracksMutationMutation>;
export type RemoveSavedTracksMutationMutationResult = Apollo.MutationResult<RemoveSavedTracksMutationMutation>;
export type RemoveSavedTracksMutationMutationOptions = Apollo.BaseMutationOptions<RemoveSavedTracksMutationMutation, RemoveSavedTracksMutationMutationVariables>;
export const ResetFieldConfigMutationDocument = gql`
    mutation ResetFieldConfigMutation($input: ResetFieldConfigInput!) {
  resetFieldConfig(input: $input) {
    fieldConfig {
      schemaField {
        fieldName
        typename
      }
    }
  }
}
    `;
export type ResetFieldConfigMutationMutationFn = Apollo.MutationFunction<ResetFieldConfigMutationMutation, ResetFieldConfigMutationMutationVariables>;

/**
 * __useResetFieldConfigMutationMutation__
 *
 * To run a mutation, you first call `useResetFieldConfigMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetFieldConfigMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetFieldConfigMutationMutation, { data, loading, error }] = useResetFieldConfigMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResetFieldConfigMutationMutation(baseOptions?: Apollo.MutationHookOptions<ResetFieldConfigMutationMutation, ResetFieldConfigMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetFieldConfigMutationMutation, ResetFieldConfigMutationMutationVariables>(ResetFieldConfigMutationDocument, options);
      }
export type ResetFieldConfigMutationMutationHookResult = ReturnType<typeof useResetFieldConfigMutationMutation>;
export type ResetFieldConfigMutationMutationResult = Apollo.MutationResult<ResetFieldConfigMutationMutation>;
export type ResetFieldConfigMutationMutationOptions = Apollo.BaseMutationOptions<ResetFieldConfigMutationMutation, ResetFieldConfigMutationMutationVariables>;
export const ResumePlaybackMutationDocument = gql`
    mutation ResumePlaybackMutation($input: ResumePlaybackInput) {
  resumePlayback(input: $input) {
    playbackState {
      context {
        uri
        type
      }
      isPlaying
    }
  }
}
    `;
export type ResumePlaybackMutationMutationFn = Apollo.MutationFunction<ResumePlaybackMutationMutation, ResumePlaybackMutationMutationVariables>;

/**
 * __useResumePlaybackMutationMutation__
 *
 * To run a mutation, you first call `useResumePlaybackMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResumePlaybackMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resumePlaybackMutationMutation, { data, loading, error }] = useResumePlaybackMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResumePlaybackMutationMutation(baseOptions?: Apollo.MutationHookOptions<ResumePlaybackMutationMutation, ResumePlaybackMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResumePlaybackMutationMutation, ResumePlaybackMutationMutationVariables>(ResumePlaybackMutationDocument, options);
      }
export type ResumePlaybackMutationMutationHookResult = ReturnType<typeof useResumePlaybackMutationMutation>;
export type ResumePlaybackMutationMutationResult = Apollo.MutationResult<ResumePlaybackMutationMutation>;
export type ResumePlaybackMutationMutationOptions = Apollo.BaseMutationOptions<ResumePlaybackMutationMutation, ResumePlaybackMutationMutationVariables>;
export const SaveAlbumsMutationDocument = gql`
    mutation SaveAlbumsMutation($input: SaveAlbumsInput!) {
  saveAlbums(input: $input) {
    savedAlbums {
      id
    }
  }
}
    `;
export type SaveAlbumsMutationMutationFn = Apollo.MutationFunction<SaveAlbumsMutationMutation, SaveAlbumsMutationMutationVariables>;

/**
 * __useSaveAlbumsMutationMutation__
 *
 * To run a mutation, you first call `useSaveAlbumsMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveAlbumsMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveAlbumsMutationMutation, { data, loading, error }] = useSaveAlbumsMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveAlbumsMutationMutation(baseOptions?: Apollo.MutationHookOptions<SaveAlbumsMutationMutation, SaveAlbumsMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveAlbumsMutationMutation, SaveAlbumsMutationMutationVariables>(SaveAlbumsMutationDocument, options);
      }
export type SaveAlbumsMutationMutationHookResult = ReturnType<typeof useSaveAlbumsMutationMutation>;
export type SaveAlbumsMutationMutationResult = Apollo.MutationResult<SaveAlbumsMutationMutation>;
export type SaveAlbumsMutationMutationOptions = Apollo.BaseMutationOptions<SaveAlbumsMutationMutation, SaveAlbumsMutationMutationVariables>;
export const SaveTracksMutationDocument = gql`
    mutation SaveTracksMutation($input: SaveTracksInput!) {
  saveTracks(input: $input) {
    savedTracks {
      id
    }
  }
}
    `;
export type SaveTracksMutationMutationFn = Apollo.MutationFunction<SaveTracksMutationMutation, SaveTracksMutationMutationVariables>;

/**
 * __useSaveTracksMutationMutation__
 *
 * To run a mutation, you first call `useSaveTracksMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveTracksMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveTracksMutationMutation, { data, loading, error }] = useSaveTracksMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveTracksMutationMutation(baseOptions?: Apollo.MutationHookOptions<SaveTracksMutationMutation, SaveTracksMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveTracksMutationMutation, SaveTracksMutationMutationVariables>(SaveTracksMutationDocument, options);
      }
export type SaveTracksMutationMutationHookResult = ReturnType<typeof useSaveTracksMutationMutation>;
export type SaveTracksMutationMutationResult = Apollo.MutationResult<SaveTracksMutationMutation>;
export type SaveTracksMutationMutationOptions = Apollo.BaseMutationOptions<SaveTracksMutationMutation, SaveTracksMutationMutationVariables>;
export const SeekToPositionMutationDocument = gql`
    mutation SeekToPositionMutation($positionMs: Int!) {
  seekToPosition(positionMs: $positionMs) {
    playbackState {
      progressMs
    }
  }
}
    `;
export type SeekToPositionMutationMutationFn = Apollo.MutationFunction<SeekToPositionMutationMutation, SeekToPositionMutationMutationVariables>;

/**
 * __useSeekToPositionMutationMutation__
 *
 * To run a mutation, you first call `useSeekToPositionMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSeekToPositionMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [seekToPositionMutationMutation, { data, loading, error }] = useSeekToPositionMutationMutation({
 *   variables: {
 *      positionMs: // value for 'positionMs'
 *   },
 * });
 */
export function useSeekToPositionMutationMutation(baseOptions?: Apollo.MutationHookOptions<SeekToPositionMutationMutation, SeekToPositionMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SeekToPositionMutationMutation, SeekToPositionMutationMutationVariables>(SeekToPositionMutationDocument, options);
      }
export type SeekToPositionMutationMutationHookResult = ReturnType<typeof useSeekToPositionMutationMutation>;
export type SeekToPositionMutationMutationResult = Apollo.MutationResult<SeekToPositionMutationMutation>;
export type SeekToPositionMutationMutationOptions = Apollo.BaseMutationOptions<SeekToPositionMutationMutation, SeekToPositionMutationMutationVariables>;
export const SetRepeatModeMutationDocument = gql`
    mutation SetRepeatModeMutation($state: RepeatMode!) {
  setRepeatMode(state: $state) {
    playbackState {
      repeatState
    }
  }
}
    `;
export type SetRepeatModeMutationMutationFn = Apollo.MutationFunction<SetRepeatModeMutationMutation, SetRepeatModeMutationMutationVariables>;

/**
 * __useSetRepeatModeMutationMutation__
 *
 * To run a mutation, you first call `useSetRepeatModeMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetRepeatModeMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setRepeatModeMutationMutation, { data, loading, error }] = useSetRepeatModeMutationMutation({
 *   variables: {
 *      state: // value for 'state'
 *   },
 * });
 */
export function useSetRepeatModeMutationMutation(baseOptions?: Apollo.MutationHookOptions<SetRepeatModeMutationMutation, SetRepeatModeMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetRepeatModeMutationMutation, SetRepeatModeMutationMutationVariables>(SetRepeatModeMutationDocument, options);
      }
export type SetRepeatModeMutationMutationHookResult = ReturnType<typeof useSetRepeatModeMutationMutation>;
export type SetRepeatModeMutationMutationResult = Apollo.MutationResult<SetRepeatModeMutationMutation>;
export type SetRepeatModeMutationMutationOptions = Apollo.BaseMutationOptions<SetRepeatModeMutationMutation, SetRepeatModeMutationMutationVariables>;
export const SetVolumeMutationDocument = gql`
    mutation SetVolumeMutation($volumePercent: Int!) {
  setVolume(volumePercent: $volumePercent) {
    playbackState {
      device {
        id
        volumePercent
      }
    }
  }
}
    `;
export type SetVolumeMutationMutationFn = Apollo.MutationFunction<SetVolumeMutationMutation, SetVolumeMutationMutationVariables>;

/**
 * __useSetVolumeMutationMutation__
 *
 * To run a mutation, you first call `useSetVolumeMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetVolumeMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setVolumeMutationMutation, { data, loading, error }] = useSetVolumeMutationMutation({
 *   variables: {
 *      volumePercent: // value for 'volumePercent'
 *   },
 * });
 */
export function useSetVolumeMutationMutation(baseOptions?: Apollo.MutationHookOptions<SetVolumeMutationMutation, SetVolumeMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetVolumeMutationMutation, SetVolumeMutationMutationVariables>(SetVolumeMutationDocument, options);
      }
export type SetVolumeMutationMutationHookResult = ReturnType<typeof useSetVolumeMutationMutation>;
export type SetVolumeMutationMutationResult = Apollo.MutationResult<SetVolumeMutationMutation>;
export type SetVolumeMutationMutationOptions = Apollo.BaseMutationOptions<SetVolumeMutationMutation, SetVolumeMutationMutationVariables>;
export const ShufflePlaybackMutationDocument = gql`
    mutation ShufflePlaybackMutation($state: Boolean!) {
  shufflePlayback(state: $state) {
    playbackState {
      shuffleState
    }
  }
}
    `;
export type ShufflePlaybackMutationMutationFn = Apollo.MutationFunction<ShufflePlaybackMutationMutation, ShufflePlaybackMutationMutationVariables>;

/**
 * __useShufflePlaybackMutationMutation__
 *
 * To run a mutation, you first call `useShufflePlaybackMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useShufflePlaybackMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [shufflePlaybackMutationMutation, { data, loading, error }] = useShufflePlaybackMutationMutation({
 *   variables: {
 *      state: // value for 'state'
 *   },
 * });
 */
export function useShufflePlaybackMutationMutation(baseOptions?: Apollo.MutationHookOptions<ShufflePlaybackMutationMutation, ShufflePlaybackMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ShufflePlaybackMutationMutation, ShufflePlaybackMutationMutationVariables>(ShufflePlaybackMutationDocument, options);
      }
export type ShufflePlaybackMutationMutationHookResult = ReturnType<typeof useShufflePlaybackMutationMutation>;
export type ShufflePlaybackMutationMutationResult = Apollo.MutationResult<ShufflePlaybackMutationMutation>;
export type ShufflePlaybackMutationMutationOptions = Apollo.BaseMutationOptions<ShufflePlaybackMutationMutation, ShufflePlaybackMutationMutationVariables>;
export const SkipToNextMutationDocument = gql`
    mutation SkipToNextMutation {
  skipToNext {
    playbackState {
      progressMs
      item {
        __typename
        ... on Track {
          id
          name
          album {
            id
            name
            images {
              url
            }
          }
          artists {
            id
            name
          }
        }
        ... on Episode {
          id
          name
          show {
            id
            name
            images {
              url
            }
          }
        }
      }
    }
  }
}
    `;
export type SkipToNextMutationMutationFn = Apollo.MutationFunction<SkipToNextMutationMutation, SkipToNextMutationMutationVariables>;

/**
 * __useSkipToNextMutationMutation__
 *
 * To run a mutation, you first call `useSkipToNextMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSkipToNextMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [skipToNextMutationMutation, { data, loading, error }] = useSkipToNextMutationMutation({
 *   variables: {
 *   },
 * });
 */
export function useSkipToNextMutationMutation(baseOptions?: Apollo.MutationHookOptions<SkipToNextMutationMutation, SkipToNextMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SkipToNextMutationMutation, SkipToNextMutationMutationVariables>(SkipToNextMutationDocument, options);
      }
export type SkipToNextMutationMutationHookResult = ReturnType<typeof useSkipToNextMutationMutation>;
export type SkipToNextMutationMutationResult = Apollo.MutationResult<SkipToNextMutationMutation>;
export type SkipToNextMutationMutationOptions = Apollo.BaseMutationOptions<SkipToNextMutationMutation, SkipToNextMutationMutationVariables>;
export const SkipToPreviousMutationDocument = gql`
    mutation SkipToPreviousMutation {
  skipToPrevious {
    playbackState {
      progressMs
      item {
        __typename
        ... on Track {
          id
          name
          album {
            id
            name
            images {
              url
            }
          }
          artists {
            id
            name
          }
        }
        ... on Episode {
          id
          name
          show {
            id
            name
            images {
              url
            }
          }
        }
      }
    }
  }
}
    `;
export type SkipToPreviousMutationMutationFn = Apollo.MutationFunction<SkipToPreviousMutationMutation, SkipToPreviousMutationMutationVariables>;

/**
 * __useSkipToPreviousMutationMutation__
 *
 * To run a mutation, you first call `useSkipToPreviousMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSkipToPreviousMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [skipToPreviousMutationMutation, { data, loading, error }] = useSkipToPreviousMutationMutation({
 *   variables: {
 *   },
 * });
 */
export function useSkipToPreviousMutationMutation(baseOptions?: Apollo.MutationHookOptions<SkipToPreviousMutationMutation, SkipToPreviousMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SkipToPreviousMutationMutation, SkipToPreviousMutationMutationVariables>(SkipToPreviousMutationDocument, options);
      }
export type SkipToPreviousMutationMutationHookResult = ReturnType<typeof useSkipToPreviousMutationMutation>;
export type SkipToPreviousMutationMutationResult = Apollo.MutationResult<SkipToPreviousMutationMutation>;
export type SkipToPreviousMutationMutationOptions = Apollo.BaseMutationOptions<SkipToPreviousMutationMutation, SkipToPreviousMutationMutationVariables>;
export const TransferPlaybackMutationDocument = gql`
    mutation TransferPlaybackMutation($input: TransferPlaybackInput!) {
  transferPlayback(input: $input) {
    playbackState {
      device {
        id
      }
    }
  }
}
    `;
export type TransferPlaybackMutationMutationFn = Apollo.MutationFunction<TransferPlaybackMutationMutation, TransferPlaybackMutationMutationVariables>;

/**
 * __useTransferPlaybackMutationMutation__
 *
 * To run a mutation, you first call `useTransferPlaybackMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTransferPlaybackMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [transferPlaybackMutationMutation, { data, loading, error }] = useTransferPlaybackMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTransferPlaybackMutationMutation(baseOptions?: Apollo.MutationHookOptions<TransferPlaybackMutationMutation, TransferPlaybackMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TransferPlaybackMutationMutation, TransferPlaybackMutationMutationVariables>(TransferPlaybackMutationDocument, options);
      }
export type TransferPlaybackMutationMutationHookResult = ReturnType<typeof useTransferPlaybackMutationMutation>;
export type TransferPlaybackMutationMutationResult = Apollo.MutationResult<TransferPlaybackMutationMutation>;
export type TransferPlaybackMutationMutationOptions = Apollo.BaseMutationOptions<TransferPlaybackMutationMutation, TransferPlaybackMutationMutationVariables>;
export const UpdateFieldConfigMutationDocument = gql`
    mutation UpdateFieldConfigMutation($input: UpdateFieldConfigInput!) {
  updateFieldConfig(input: $input) {
    fieldConfig {
      schemaField {
        fieldName
        typename
      }
      timeout
      errorRate
    }
  }
}
    `;
export type UpdateFieldConfigMutationMutationFn = Apollo.MutationFunction<UpdateFieldConfigMutationMutation, UpdateFieldConfigMutationMutationVariables>;

/**
 * __useUpdateFieldConfigMutationMutation__
 *
 * To run a mutation, you first call `useUpdateFieldConfigMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFieldConfigMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFieldConfigMutationMutation, { data, loading, error }] = useUpdateFieldConfigMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateFieldConfigMutationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFieldConfigMutationMutation, UpdateFieldConfigMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFieldConfigMutationMutation, UpdateFieldConfigMutationMutationVariables>(UpdateFieldConfigMutationDocument, options);
      }
export type UpdateFieldConfigMutationMutationHookResult = ReturnType<typeof useUpdateFieldConfigMutationMutation>;
export type UpdateFieldConfigMutationMutationResult = Apollo.MutationResult<UpdateFieldConfigMutationMutation>;
export type UpdateFieldConfigMutationMutationOptions = Apollo.BaseMutationOptions<UpdateFieldConfigMutationMutation, UpdateFieldConfigMutationMutationVariables>;
export const MyPlaylistsDocument = gql`
    query MyPlaylists($limit: Int) {
  me {
    playlists(limit: $limit) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
}
    `;

/**
 * __useMyPlaylistsQuery__
 *
 * To run a query within a React component, call `useMyPlaylistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyPlaylistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyPlaylistsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useMyPlaylistsQuery(baseOptions?: Apollo.QueryHookOptions<MyPlaylistsQuery, MyPlaylistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyPlaylistsQuery, MyPlaylistsQueryVariables>(MyPlaylistsDocument, options);
      }
export function useMyPlaylistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyPlaylistsQuery, MyPlaylistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyPlaylistsQuery, MyPlaylistsQueryVariables>(MyPlaylistsDocument, options);
        }
export function useMyPlaylistsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MyPlaylistsQuery, MyPlaylistsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyPlaylistsQuery, MyPlaylistsQueryVariables>(MyPlaylistsDocument, options);
        }
export type MyPlaylistsQueryHookResult = ReturnType<typeof useMyPlaylistsQuery>;
export type MyPlaylistsLazyQueryHookResult = ReturnType<typeof useMyPlaylistsLazyQuery>;
export type MyPlaylistsSuspenseQueryHookResult = ReturnType<typeof useMyPlaylistsSuspenseQuery>;
export type MyPlaylistsQueryResult = Apollo.QueryResult<MyPlaylistsQuery, MyPlaylistsQueryVariables>;
export const AlbumRouteQueryDocument = gql`
    query AlbumRouteQuery($albumId: ID!) {
  me {
    albumsContains(ids: [$albumId])
  }
  album(id: $albumId) {
    id
    albumType
    name
    totalTracks
    uri
    artists {
      id
      name
    }
    copyrights {
      text
      type
    }
    images {
      url
      vibrantColor(format: RGB, alpha: 0.9) @client
    }
    releaseDate {
      date
      precision
    }
    ...AlbumTracksTable_album
  }
}
    ${AlbumTracksTableAlbumFragmentDoc}`;

/**
 * __useAlbumRouteQueryQuery__
 *
 * To run a query within a React component, call `useAlbumRouteQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useAlbumRouteQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAlbumRouteQueryQuery({
 *   variables: {
 *      albumId: // value for 'albumId'
 *   },
 * });
 */
export function useAlbumRouteQueryQuery(baseOptions: Apollo.QueryHookOptions<AlbumRouteQueryQuery, AlbumRouteQueryQueryVariables> & ({ variables: AlbumRouteQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AlbumRouteQueryQuery, AlbumRouteQueryQueryVariables>(AlbumRouteQueryDocument, options);
      }
export function useAlbumRouteQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AlbumRouteQueryQuery, AlbumRouteQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AlbumRouteQueryQuery, AlbumRouteQueryQueryVariables>(AlbumRouteQueryDocument, options);
        }
export function useAlbumRouteQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AlbumRouteQueryQuery, AlbumRouteQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AlbumRouteQueryQuery, AlbumRouteQueryQueryVariables>(AlbumRouteQueryDocument, options);
        }
export type AlbumRouteQueryQueryHookResult = ReturnType<typeof useAlbumRouteQueryQuery>;
export type AlbumRouteQueryLazyQueryHookResult = ReturnType<typeof useAlbumRouteQueryLazyQuery>;
export type AlbumRouteQuerySuspenseQueryHookResult = ReturnType<typeof useAlbumRouteQuerySuspenseQuery>;
export type AlbumRouteQueryQueryResult = Apollo.QueryResult<AlbumRouteQueryQuery, AlbumRouteQueryQueryVariables>;
export const ArtistRouteQueryDocument = gql`
    query ArtistRouteQuery($artistId: ID!) {
  artist(id: $artistId) {
    id
    name
    albums(includeGroups: [ALBUM]) {
      ...ArtistRouteQuery_albums
    }
    singles: albums(includeGroups: [SINGLE]) {
      ...ArtistRouteQuery_albums
    }
    appearsOn: albums(includeGroups: [APPEARS_ON]) {
      ...ArtistRouteQuery_albums
    }
    followers {
      total
    }
    images {
      url
    }
    topTracks {
      id
      ...ArtistTopTracks_tracks
    }
  }
}
    ${ArtistRouteQueryAlbumsFragmentDoc}
${ArtistTopTracksTracksFragmentDoc}`;

/**
 * __useArtistRouteQueryQuery__
 *
 * To run a query within a React component, call `useArtistRouteQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useArtistRouteQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArtistRouteQueryQuery({
 *   variables: {
 *      artistId: // value for 'artistId'
 *   },
 * });
 */
export function useArtistRouteQueryQuery(baseOptions: Apollo.QueryHookOptions<ArtistRouteQueryQuery, ArtistRouteQueryQueryVariables> & ({ variables: ArtistRouteQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArtistRouteQueryQuery, ArtistRouteQueryQueryVariables>(ArtistRouteQueryDocument, options);
      }
export function useArtistRouteQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArtistRouteQueryQuery, ArtistRouteQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArtistRouteQueryQuery, ArtistRouteQueryQueryVariables>(ArtistRouteQueryDocument, options);
        }
export function useArtistRouteQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ArtistRouteQueryQuery, ArtistRouteQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ArtistRouteQueryQuery, ArtistRouteQueryQueryVariables>(ArtistRouteQueryDocument, options);
        }
export type ArtistRouteQueryQueryHookResult = ReturnType<typeof useArtistRouteQueryQuery>;
export type ArtistRouteQueryLazyQueryHookResult = ReturnType<typeof useArtistRouteQueryLazyQuery>;
export type ArtistRouteQuerySuspenseQueryHookResult = ReturnType<typeof useArtistRouteQuerySuspenseQuery>;
export type ArtistRouteQueryQueryResult = Apollo.QueryResult<ArtistRouteQueryQuery, ArtistRouteQueryQueryVariables>;
export const CollectionAlbumsRouteQueryDocument = gql`
    query CollectionAlbumsRouteQuery($offset: Int, $limit: Int) {
  me {
    albums(offset: $offset, limit: $limit) {
      pageInfo {
        limit
        offset
        hasNextPage
      }
      edges {
        node {
          id
          ...AlbumTile_album
        }
      }
    }
  }
}
    ${AlbumTileAlbumFragmentDoc}`;

/**
 * __useCollectionAlbumsRouteQueryQuery__
 *
 * To run a query within a React component, call `useCollectionAlbumsRouteQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollectionAlbumsRouteQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollectionAlbumsRouteQueryQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useCollectionAlbumsRouteQueryQuery(baseOptions?: Apollo.QueryHookOptions<CollectionAlbumsRouteQueryQuery, CollectionAlbumsRouteQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CollectionAlbumsRouteQueryQuery, CollectionAlbumsRouteQueryQueryVariables>(CollectionAlbumsRouteQueryDocument, options);
      }
export function useCollectionAlbumsRouteQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CollectionAlbumsRouteQueryQuery, CollectionAlbumsRouteQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CollectionAlbumsRouteQueryQuery, CollectionAlbumsRouteQueryQueryVariables>(CollectionAlbumsRouteQueryDocument, options);
        }
export function useCollectionAlbumsRouteQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CollectionAlbumsRouteQueryQuery, CollectionAlbumsRouteQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CollectionAlbumsRouteQueryQuery, CollectionAlbumsRouteQueryQueryVariables>(CollectionAlbumsRouteQueryDocument, options);
        }
export type CollectionAlbumsRouteQueryQueryHookResult = ReturnType<typeof useCollectionAlbumsRouteQueryQuery>;
export type CollectionAlbumsRouteQueryLazyQueryHookResult = ReturnType<typeof useCollectionAlbumsRouteQueryLazyQuery>;
export type CollectionAlbumsRouteQuerySuspenseQueryHookResult = ReturnType<typeof useCollectionAlbumsRouteQuerySuspenseQuery>;
export type CollectionAlbumsRouteQueryQueryResult = Apollo.QueryResult<CollectionAlbumsRouteQueryQuery, CollectionAlbumsRouteQueryQueryVariables>;
export const CollectionArtistsRouteQueryDocument = gql`
    query CollectionArtistsRouteQuery($after: String) {
  me {
    followedArtists(after: $after) {
      pageInfo {
        cursors {
          after
        }
      }
      edges {
        node {
          id
          ...ArtistTile_artist
        }
      }
    }
  }
}
    ${ArtistTileArtistFragmentDoc}`;

/**
 * __useCollectionArtistsRouteQueryQuery__
 *
 * To run a query within a React component, call `useCollectionArtistsRouteQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollectionArtistsRouteQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollectionArtistsRouteQueryQuery({
 *   variables: {
 *      after: // value for 'after'
 *   },
 * });
 */
export function useCollectionArtistsRouteQueryQuery(baseOptions?: Apollo.QueryHookOptions<CollectionArtistsRouteQueryQuery, CollectionArtistsRouteQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CollectionArtistsRouteQueryQuery, CollectionArtistsRouteQueryQueryVariables>(CollectionArtistsRouteQueryDocument, options);
      }
export function useCollectionArtistsRouteQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CollectionArtistsRouteQueryQuery, CollectionArtistsRouteQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CollectionArtistsRouteQueryQuery, CollectionArtistsRouteQueryQueryVariables>(CollectionArtistsRouteQueryDocument, options);
        }
export function useCollectionArtistsRouteQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CollectionArtistsRouteQueryQuery, CollectionArtistsRouteQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CollectionArtistsRouteQueryQuery, CollectionArtistsRouteQueryQueryVariables>(CollectionArtistsRouteQueryDocument, options);
        }
export type CollectionArtistsRouteQueryQueryHookResult = ReturnType<typeof useCollectionArtistsRouteQueryQuery>;
export type CollectionArtistsRouteQueryLazyQueryHookResult = ReturnType<typeof useCollectionArtistsRouteQueryLazyQuery>;
export type CollectionArtistsRouteQuerySuspenseQueryHookResult = ReturnType<typeof useCollectionArtistsRouteQuerySuspenseQuery>;
export type CollectionArtistsRouteQueryQueryResult = Apollo.QueryResult<CollectionArtistsRouteQueryQuery, CollectionArtistsRouteQueryQueryVariables>;
export const CollectionPlaylistsRouteQueryDocument = gql`
    query CollectionPlaylistsRouteQuery($offset: Int, $limit: Int) {
  me {
    profile {
      id
    }
    episodes {
      pageInfo {
        total
      }
    }
    tracks(limit: 10) @connection(key: "collectionPlaylistsTracks") {
      pageInfo {
        total
      }
      edges {
        node {
          id
          name
          artists {
            id
            name
          }
        }
      }
      ...LikedSongsTile_connection
    }
    playlists(offset: $offset, limit: $limit) @connection(key: "collectionPlaylists") {
      pageInfo {
        offset
        limit
        hasNextPage
      }
      edges {
        node {
          id
          ...PlaylistTile_playlist
        }
      }
    }
  }
}
    ${LikedSongsTileConnectionFragmentDoc}
${PlaylistTilePlaylistFragmentDoc}`;

/**
 * __useCollectionPlaylistsRouteQueryQuery__
 *
 * To run a query within a React component, call `useCollectionPlaylistsRouteQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollectionPlaylistsRouteQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollectionPlaylistsRouteQueryQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useCollectionPlaylistsRouteQueryQuery(baseOptions?: Apollo.QueryHookOptions<CollectionPlaylistsRouteQueryQuery, CollectionPlaylistsRouteQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CollectionPlaylistsRouteQueryQuery, CollectionPlaylistsRouteQueryQueryVariables>(CollectionPlaylistsRouteQueryDocument, options);
      }
export function useCollectionPlaylistsRouteQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CollectionPlaylistsRouteQueryQuery, CollectionPlaylistsRouteQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CollectionPlaylistsRouteQueryQuery, CollectionPlaylistsRouteQueryQueryVariables>(CollectionPlaylistsRouteQueryDocument, options);
        }
export function useCollectionPlaylistsRouteQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CollectionPlaylistsRouteQueryQuery, CollectionPlaylistsRouteQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CollectionPlaylistsRouteQueryQuery, CollectionPlaylistsRouteQueryQueryVariables>(CollectionPlaylistsRouteQueryDocument, options);
        }
export type CollectionPlaylistsRouteQueryQueryHookResult = ReturnType<typeof useCollectionPlaylistsRouteQueryQuery>;
export type CollectionPlaylistsRouteQueryLazyQueryHookResult = ReturnType<typeof useCollectionPlaylistsRouteQueryLazyQuery>;
export type CollectionPlaylistsRouteQuerySuspenseQueryHookResult = ReturnType<typeof useCollectionPlaylistsRouteQuerySuspenseQuery>;
export type CollectionPlaylistsRouteQueryQueryResult = Apollo.QueryResult<CollectionPlaylistsRouteQueryQuery, CollectionPlaylistsRouteQueryQueryVariables>;
export const CollectionPlaylistsRoutePaginatedQueryDocument = gql`
    query CollectionPlaylistsRoutePaginatedQuery($offset: Int, $limit: Int) {
  me {
    playlists(offset: $offset, limit: $limit) @connection(key: "collectionPlaylists") {
      pageInfo {
        offset
        limit
        hasNextPage
      }
      edges {
        node {
          id
          ...PlaylistTile_playlist
        }
      }
    }
  }
}
    ${PlaylistTilePlaylistFragmentDoc}`;

/**
 * __useCollectionPlaylistsRoutePaginatedQueryQuery__
 *
 * To run a query within a React component, call `useCollectionPlaylistsRoutePaginatedQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollectionPlaylistsRoutePaginatedQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollectionPlaylistsRoutePaginatedQueryQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useCollectionPlaylistsRoutePaginatedQueryQuery(baseOptions?: Apollo.QueryHookOptions<CollectionPlaylistsRoutePaginatedQueryQuery, CollectionPlaylistsRoutePaginatedQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CollectionPlaylistsRoutePaginatedQueryQuery, CollectionPlaylistsRoutePaginatedQueryQueryVariables>(CollectionPlaylistsRoutePaginatedQueryDocument, options);
      }
export function useCollectionPlaylistsRoutePaginatedQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CollectionPlaylistsRoutePaginatedQueryQuery, CollectionPlaylistsRoutePaginatedQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CollectionPlaylistsRoutePaginatedQueryQuery, CollectionPlaylistsRoutePaginatedQueryQueryVariables>(CollectionPlaylistsRoutePaginatedQueryDocument, options);
        }
export function useCollectionPlaylistsRoutePaginatedQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CollectionPlaylistsRoutePaginatedQueryQuery, CollectionPlaylistsRoutePaginatedQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CollectionPlaylistsRoutePaginatedQueryQuery, CollectionPlaylistsRoutePaginatedQueryQueryVariables>(CollectionPlaylistsRoutePaginatedQueryDocument, options);
        }
export type CollectionPlaylistsRoutePaginatedQueryQueryHookResult = ReturnType<typeof useCollectionPlaylistsRoutePaginatedQueryQuery>;
export type CollectionPlaylistsRoutePaginatedQueryLazyQueryHookResult = ReturnType<typeof useCollectionPlaylistsRoutePaginatedQueryLazyQuery>;
export type CollectionPlaylistsRoutePaginatedQuerySuspenseQueryHookResult = ReturnType<typeof useCollectionPlaylistsRoutePaginatedQuerySuspenseQuery>;
export type CollectionPlaylistsRoutePaginatedQueryQueryResult = Apollo.QueryResult<CollectionPlaylistsRoutePaginatedQueryQuery, CollectionPlaylistsRoutePaginatedQueryQueryVariables>;
export const CollectionPodcastsRouteQueryDocument = gql`
    query CollectionPodcastsRouteQuery($limit: Int, $offset: Int) {
  me {
    episodes(limit: 10) {
      ...YourEpisodesTile_connection
    }
    shows(offset: $offset, limit: $limit) {
      pageInfo {
        offset
        limit
        hasNextPage
      }
      edges {
        node {
          id
          name
          publisher
          images {
            url
          }
        }
      }
    }
  }
}
    ${YourEpisodesTileConnectionFragmentDoc}`;

/**
 * __useCollectionPodcastsRouteQueryQuery__
 *
 * To run a query within a React component, call `useCollectionPodcastsRouteQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollectionPodcastsRouteQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollectionPodcastsRouteQueryQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useCollectionPodcastsRouteQueryQuery(baseOptions?: Apollo.QueryHookOptions<CollectionPodcastsRouteQueryQuery, CollectionPodcastsRouteQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CollectionPodcastsRouteQueryQuery, CollectionPodcastsRouteQueryQueryVariables>(CollectionPodcastsRouteQueryDocument, options);
      }
export function useCollectionPodcastsRouteQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CollectionPodcastsRouteQueryQuery, CollectionPodcastsRouteQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CollectionPodcastsRouteQueryQuery, CollectionPodcastsRouteQueryQueryVariables>(CollectionPodcastsRouteQueryDocument, options);
        }
export function useCollectionPodcastsRouteQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CollectionPodcastsRouteQueryQuery, CollectionPodcastsRouteQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CollectionPodcastsRouteQueryQuery, CollectionPodcastsRouteQueryQueryVariables>(CollectionPodcastsRouteQueryDocument, options);
        }
export type CollectionPodcastsRouteQueryQueryHookResult = ReturnType<typeof useCollectionPodcastsRouteQueryQuery>;
export type CollectionPodcastsRouteQueryLazyQueryHookResult = ReturnType<typeof useCollectionPodcastsRouteQueryLazyQuery>;
export type CollectionPodcastsRouteQuerySuspenseQueryHookResult = ReturnType<typeof useCollectionPodcastsRouteQuerySuspenseQuery>;
export type CollectionPodcastsRouteQueryQueryResult = Apollo.QueryResult<CollectionPodcastsRouteQueryQuery, CollectionPodcastsRouteQueryQueryVariables>;
export const CollectionPodcastsRoutePaginatedQueryDocument = gql`
    query CollectionPodcastsRoutePaginatedQuery($limit: Int, $offset: Int) {
  me {
    shows(limit: $limit, offset: $offset) {
      pageInfo {
        offset
        limit
        hasNextPage
      }
      edges {
        node {
          id
          name
          publisher
          images {
            url
          }
        }
      }
    }
  }
}
    `;

/**
 * __useCollectionPodcastsRoutePaginatedQueryQuery__
 *
 * To run a query within a React component, call `useCollectionPodcastsRoutePaginatedQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollectionPodcastsRoutePaginatedQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollectionPodcastsRoutePaginatedQueryQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useCollectionPodcastsRoutePaginatedQueryQuery(baseOptions?: Apollo.QueryHookOptions<CollectionPodcastsRoutePaginatedQueryQuery, CollectionPodcastsRoutePaginatedQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CollectionPodcastsRoutePaginatedQueryQuery, CollectionPodcastsRoutePaginatedQueryQueryVariables>(CollectionPodcastsRoutePaginatedQueryDocument, options);
      }
export function useCollectionPodcastsRoutePaginatedQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CollectionPodcastsRoutePaginatedQueryQuery, CollectionPodcastsRoutePaginatedQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CollectionPodcastsRoutePaginatedQueryQuery, CollectionPodcastsRoutePaginatedQueryQueryVariables>(CollectionPodcastsRoutePaginatedQueryDocument, options);
        }
export function useCollectionPodcastsRoutePaginatedQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CollectionPodcastsRoutePaginatedQueryQuery, CollectionPodcastsRoutePaginatedQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CollectionPodcastsRoutePaginatedQueryQuery, CollectionPodcastsRoutePaginatedQueryQueryVariables>(CollectionPodcastsRoutePaginatedQueryDocument, options);
        }
export type CollectionPodcastsRoutePaginatedQueryQueryHookResult = ReturnType<typeof useCollectionPodcastsRoutePaginatedQueryQuery>;
export type CollectionPodcastsRoutePaginatedQueryLazyQueryHookResult = ReturnType<typeof useCollectionPodcastsRoutePaginatedQueryLazyQuery>;
export type CollectionPodcastsRoutePaginatedQuerySuspenseQueryHookResult = ReturnType<typeof useCollectionPodcastsRoutePaginatedQuerySuspenseQuery>;
export type CollectionPodcastsRoutePaginatedQueryQueryResult = Apollo.QueryResult<CollectionPodcastsRoutePaginatedQueryQuery, CollectionPodcastsRoutePaginatedQueryQueryVariables>;
export const CollectionTracksRouteQueryDocument = gql`
    query CollectionTracksRouteQuery($offset: Int, $limit: Int) {
  me {
    profile {
      id
      displayName
    }
    tracks(offset: $offset, limit: $limit) {
      pageInfo {
        hasNextPage
        offset
        limit
        total
      }
      edges {
        addedAt
        node {
          id
          name
          durationMs
          album {
            id
          }
          ...TrackNumberCell_track
          ...TrackTitleCell_track
        }
      }
    }
  }
}
    ${TrackNumberCellTrackFragmentDoc}
${TrackTitleCellTrackFragmentDoc}`;

/**
 * __useCollectionTracksRouteQueryQuery__
 *
 * To run a query within a React component, call `useCollectionTracksRouteQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollectionTracksRouteQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollectionTracksRouteQueryQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useCollectionTracksRouteQueryQuery(baseOptions?: Apollo.QueryHookOptions<CollectionTracksRouteQueryQuery, CollectionTracksRouteQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CollectionTracksRouteQueryQuery, CollectionTracksRouteQueryQueryVariables>(CollectionTracksRouteQueryDocument, options);
      }
export function useCollectionTracksRouteQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CollectionTracksRouteQueryQuery, CollectionTracksRouteQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CollectionTracksRouteQueryQuery, CollectionTracksRouteQueryQueryVariables>(CollectionTracksRouteQueryDocument, options);
        }
export function useCollectionTracksRouteQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CollectionTracksRouteQueryQuery, CollectionTracksRouteQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CollectionTracksRouteQueryQuery, CollectionTracksRouteQueryQueryVariables>(CollectionTracksRouteQueryDocument, options);
        }
export type CollectionTracksRouteQueryQueryHookResult = ReturnType<typeof useCollectionTracksRouteQueryQuery>;
export type CollectionTracksRouteQueryLazyQueryHookResult = ReturnType<typeof useCollectionTracksRouteQueryLazyQuery>;
export type CollectionTracksRouteQuerySuspenseQueryHookResult = ReturnType<typeof useCollectionTracksRouteQuerySuspenseQuery>;
export type CollectionTracksRouteQueryQueryResult = Apollo.QueryResult<CollectionTracksRouteQueryQuery, CollectionTracksRouteQueryQueryVariables>;
export const EpisodeRouteQueryDocument = gql`
    query EpisodeRouteQuery($episodeId: ID!) {
  episode(id: $episodeId) {
    id
    name
    releaseDate {
      date
      precision
    }
    show {
      id
      name
      images {
        url
        vibrantColor(format: RGB, alpha: 0.9) @client
      }
    }
    ...EpisodeRemainingDuration_episode
  }
}
    ${EpisodeRemainingDurationEpisodeFragmentDoc}`;

/**
 * __useEpisodeRouteQueryQuery__
 *
 * To run a query within a React component, call `useEpisodeRouteQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useEpisodeRouteQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEpisodeRouteQueryQuery({
 *   variables: {
 *      episodeId: // value for 'episodeId'
 *   },
 * });
 */
export function useEpisodeRouteQueryQuery(baseOptions: Apollo.QueryHookOptions<EpisodeRouteQueryQuery, EpisodeRouteQueryQueryVariables> & ({ variables: EpisodeRouteQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EpisodeRouteQueryQuery, EpisodeRouteQueryQueryVariables>(EpisodeRouteQueryDocument, options);
      }
export function useEpisodeRouteQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EpisodeRouteQueryQuery, EpisodeRouteQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EpisodeRouteQueryQuery, EpisodeRouteQueryQueryVariables>(EpisodeRouteQueryDocument, options);
        }
export function useEpisodeRouteQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<EpisodeRouteQueryQuery, EpisodeRouteQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EpisodeRouteQueryQuery, EpisodeRouteQueryQueryVariables>(EpisodeRouteQueryDocument, options);
        }
export type EpisodeRouteQueryQueryHookResult = ReturnType<typeof useEpisodeRouteQueryQuery>;
export type EpisodeRouteQueryLazyQueryHookResult = ReturnType<typeof useEpisodeRouteQueryLazyQuery>;
export type EpisodeRouteQuerySuspenseQueryHookResult = ReturnType<typeof useEpisodeRouteQuerySuspenseQuery>;
export type EpisodeRouteQueryQueryResult = Apollo.QueryResult<EpisodeRouteQueryQuery, EpisodeRouteQueryQueryVariables>;
export const IndexRouteQueryDocument = gql`
    query IndexRouteQuery($limit: Int!) {
  me {
    playlists(limit: $limit) {
      edges {
        node {
          id
          ...PlaylistTile_playlist
        }
      }
    }
  }
}
    ${PlaylistTilePlaylistFragmentDoc}`;

/**
 * __useIndexRouteQueryQuery__
 *
 * To run a query within a React component, call `useIndexRouteQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useIndexRouteQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIndexRouteQueryQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useIndexRouteQueryQuery(baseOptions: Apollo.QueryHookOptions<IndexRouteQueryQuery, IndexRouteQueryQueryVariables> & ({ variables: IndexRouteQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IndexRouteQueryQuery, IndexRouteQueryQueryVariables>(IndexRouteQueryDocument, options);
      }
export function useIndexRouteQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IndexRouteQueryQuery, IndexRouteQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IndexRouteQueryQuery, IndexRouteQueryQueryVariables>(IndexRouteQueryDocument, options);
        }
export function useIndexRouteQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<IndexRouteQueryQuery, IndexRouteQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<IndexRouteQueryQuery, IndexRouteQueryQueryVariables>(IndexRouteQueryDocument, options);
        }
export type IndexRouteQueryQueryHookResult = ReturnType<typeof useIndexRouteQueryQuery>;
export type IndexRouteQueryLazyQueryHookResult = ReturnType<typeof useIndexRouteQueryLazyQuery>;
export type IndexRouteQuerySuspenseQueryHookResult = ReturnType<typeof useIndexRouteQuerySuspenseQuery>;
export type IndexRouteQueryQueryResult = Apollo.QueryResult<IndexRouteQueryQuery, IndexRouteQueryQueryVariables>;
export const PlaylistQueryDocument = gql`
    query PlaylistQuery($id: ID!, $offset: Int) {
  me {
    profile {
      id
    }
  }
  playlist(id: $id) {
    id
    name
    uri
    images {
      url
      vibrantColor(format: RGB, alpha: 0.9) @client
    }
    owner {
      id
      displayName
    }
    tracks(offset: $offset) {
      edges {
        addedAt
        node {
          id
          name
          durationMs
          uri
          ... on Track {
            album {
              id
              name
            }
            ...TrackNumberCell_track
          }
          ... on Episode {
            releaseDate {
              date
              precision
            }
            show {
              id
              name
            }
          }
          ...PlaylistTitleCell_playlistTrack
        }
      }
      pageInfo {
        hasNextPage
        offset
        limit
        total
      }
    }
    ...PlaylistTitleCell_playlist
  }
}
    ${TrackNumberCellTrackFragmentDoc}
${PlaylistTitleCellPlaylistTrackFragmentDoc}
${PlaylistTitleCellPlaylistFragmentDoc}`;

/**
 * __usePlaylistQueryQuery__
 *
 * To run a query within a React component, call `usePlaylistQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlaylistQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlaylistQueryQuery({
 *   variables: {
 *      id: // value for 'id'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function usePlaylistQueryQuery(baseOptions: Apollo.QueryHookOptions<PlaylistQueryQuery, PlaylistQueryQueryVariables> & ({ variables: PlaylistQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlaylistQueryQuery, PlaylistQueryQueryVariables>(PlaylistQueryDocument, options);
      }
export function usePlaylistQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlaylistQueryQuery, PlaylistQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlaylistQueryQuery, PlaylistQueryQueryVariables>(PlaylistQueryDocument, options);
        }
export function usePlaylistQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PlaylistQueryQuery, PlaylistQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PlaylistQueryQuery, PlaylistQueryQueryVariables>(PlaylistQueryDocument, options);
        }
export type PlaylistQueryQueryHookResult = ReturnType<typeof usePlaylistQueryQuery>;
export type PlaylistQueryLazyQueryHookResult = ReturnType<typeof usePlaylistQueryLazyQuery>;
export type PlaylistQuerySuspenseQueryHookResult = ReturnType<typeof usePlaylistQuerySuspenseQuery>;
export type PlaylistQueryQueryResult = Apollo.QueryResult<PlaylistQueryQuery, PlaylistQueryQueryVariables>;
export const QueueRouteQueryDocument = gql`
    query QueueRouteQuery {
  me {
    player {
      playbackQueue {
        currentlyPlaying {
          ...QueueRoute_playbackItem
        }
        queue {
          ...QueueRoute_playbackItem
        }
      }
    }
  }
}
    ${QueueRoutePlaybackItemFragmentDoc}`;

/**
 * __useQueueRouteQueryQuery__
 *
 * To run a query within a React component, call `useQueueRouteQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueueRouteQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueueRouteQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useQueueRouteQueryQuery(baseOptions?: Apollo.QueryHookOptions<QueueRouteQueryQuery, QueueRouteQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueueRouteQueryQuery, QueueRouteQueryQueryVariables>(QueueRouteQueryDocument, options);
      }
export function useQueueRouteQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueueRouteQueryQuery, QueueRouteQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueueRouteQueryQuery, QueueRouteQueryQueryVariables>(QueueRouteQueryDocument, options);
        }
export function useQueueRouteQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<QueueRouteQueryQuery, QueueRouteQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<QueueRouteQueryQuery, QueueRouteQueryQueryVariables>(QueueRouteQueryDocument, options);
        }
export type QueueRouteQueryQueryHookResult = ReturnType<typeof useQueueRouteQueryQuery>;
export type QueueRouteQueryLazyQueryHookResult = ReturnType<typeof useQueueRouteQueryLazyQuery>;
export type QueueRouteQuerySuspenseQueryHookResult = ReturnType<typeof useQueueRouteQuerySuspenseQuery>;
export type QueueRouteQueryQueryResult = Apollo.QueryResult<QueueRouteQueryQuery, QueueRouteQueryQueryVariables>;
export const SearchRouteQueryDocument = gql`
    query SearchRouteQuery($q: String!, $type: [SearchType!]!) {
  search(q: $q, type: $type) {
    artists {
      edges {
        node {
          id
          ...ArtistTile_artist
        }
      }
    }
  }
}
    ${ArtistTileArtistFragmentDoc}`;

/**
 * __useSearchRouteQueryQuery__
 *
 * To run a query within a React component, call `useSearchRouteQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchRouteQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchRouteQueryQuery({
 *   variables: {
 *      q: // value for 'q'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useSearchRouteQueryQuery(baseOptions: Apollo.QueryHookOptions<SearchRouteQueryQuery, SearchRouteQueryQueryVariables> & ({ variables: SearchRouteQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchRouteQueryQuery, SearchRouteQueryQueryVariables>(SearchRouteQueryDocument, options);
      }
export function useSearchRouteQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchRouteQueryQuery, SearchRouteQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchRouteQueryQuery, SearchRouteQueryQueryVariables>(SearchRouteQueryDocument, options);
        }
export function useSearchRouteQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchRouteQueryQuery, SearchRouteQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchRouteQueryQuery, SearchRouteQueryQueryVariables>(SearchRouteQueryDocument, options);
        }
export type SearchRouteQueryQueryHookResult = ReturnType<typeof useSearchRouteQueryQuery>;
export type SearchRouteQueryLazyQueryHookResult = ReturnType<typeof useSearchRouteQueryLazyQuery>;
export type SearchRouteQuerySuspenseQueryHookResult = ReturnType<typeof useSearchRouteQuerySuspenseQuery>;
export type SearchRouteQueryQueryResult = Apollo.QueryResult<SearchRouteQueryQuery, SearchRouteQueryQueryVariables>;
export const SettingsQueryDocument = gql`
    query SettingsQuery {
  developer {
    fieldConfigs {
      schemaField {
        fieldName
        typename
      }
      timeout
      errorRate
    }
  }
}
    `;

/**
 * __useSettingsQueryQuery__
 *
 * To run a query within a React component, call `useSettingsQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useSettingsQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSettingsQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useSettingsQueryQuery(baseOptions?: Apollo.QueryHookOptions<SettingsQueryQuery, SettingsQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SettingsQueryQuery, SettingsQueryQueryVariables>(SettingsQueryDocument, options);
      }
export function useSettingsQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SettingsQueryQuery, SettingsQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SettingsQueryQuery, SettingsQueryQueryVariables>(SettingsQueryDocument, options);
        }
export function useSettingsQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SettingsQueryQuery, SettingsQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SettingsQueryQuery, SettingsQueryQueryVariables>(SettingsQueryDocument, options);
        }
export type SettingsQueryQueryHookResult = ReturnType<typeof useSettingsQueryQuery>;
export type SettingsQueryLazyQueryHookResult = ReturnType<typeof useSettingsQueryLazyQuery>;
export type SettingsQuerySuspenseQueryHookResult = ReturnType<typeof useSettingsQuerySuspenseQuery>;
export type SettingsQueryQueryResult = Apollo.QueryResult<SettingsQueryQuery, SettingsQueryQueryVariables>;
export const LimitedIntrospectionQueryDocument = gql`
    query LimitedIntrospectionQuery {
  __schema {
    types {
      name
      kind
      fields {
        name
        description
        type {
          ...TypeRef
        }
      }
    }
  }
}
    ${TypeRefFragmentDoc}`;

/**
 * __useLimitedIntrospectionQueryQuery__
 *
 * To run a query within a React component, call `useLimitedIntrospectionQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useLimitedIntrospectionQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLimitedIntrospectionQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useLimitedIntrospectionQueryQuery(baseOptions?: Apollo.QueryHookOptions<LimitedIntrospectionQueryQuery, LimitedIntrospectionQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LimitedIntrospectionQueryQuery, LimitedIntrospectionQueryQueryVariables>(LimitedIntrospectionQueryDocument, options);
      }
export function useLimitedIntrospectionQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LimitedIntrospectionQueryQuery, LimitedIntrospectionQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LimitedIntrospectionQueryQuery, LimitedIntrospectionQueryQueryVariables>(LimitedIntrospectionQueryDocument, options);
        }
export function useLimitedIntrospectionQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LimitedIntrospectionQueryQuery, LimitedIntrospectionQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LimitedIntrospectionQueryQuery, LimitedIntrospectionQueryQueryVariables>(LimitedIntrospectionQueryDocument, options);
        }
export type LimitedIntrospectionQueryQueryHookResult = ReturnType<typeof useLimitedIntrospectionQueryQuery>;
export type LimitedIntrospectionQueryLazyQueryHookResult = ReturnType<typeof useLimitedIntrospectionQueryLazyQuery>;
export type LimitedIntrospectionQuerySuspenseQueryHookResult = ReturnType<typeof useLimitedIntrospectionQuerySuspenseQuery>;
export type LimitedIntrospectionQueryQueryResult = Apollo.QueryResult<LimitedIntrospectionQueryQuery, LimitedIntrospectionQueryQueryVariables>;
export const ShowRouteQueryDocument = gql`
    query ShowRouteQuery($showId: ID!) {
  show(id: $showId) {
    id
    description(format: HTML)
    name
    publisher
    episodes {
      edges {
        node {
          id
          name
          durationMs
          uri
          releaseDate {
            date
            precision
          }
          ...EpisodeRemainingDuration_episode
        }
      }
    }
    images {
      url
      vibrantColor(format: RGB, alpha: 0.9) @client
    }
  }
}
    ${EpisodeRemainingDurationEpisodeFragmentDoc}`;

/**
 * __useShowRouteQueryQuery__
 *
 * To run a query within a React component, call `useShowRouteQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useShowRouteQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShowRouteQueryQuery({
 *   variables: {
 *      showId: // value for 'showId'
 *   },
 * });
 */
export function useShowRouteQueryQuery(baseOptions: Apollo.QueryHookOptions<ShowRouteQueryQuery, ShowRouteQueryQueryVariables> & ({ variables: ShowRouteQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShowRouteQueryQuery, ShowRouteQueryQueryVariables>(ShowRouteQueryDocument, options);
      }
export function useShowRouteQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShowRouteQueryQuery, ShowRouteQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShowRouteQueryQuery, ShowRouteQueryQueryVariables>(ShowRouteQueryDocument, options);
        }
export function useShowRouteQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ShowRouteQueryQuery, ShowRouteQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ShowRouteQueryQuery, ShowRouteQueryQueryVariables>(ShowRouteQueryDocument, options);
        }
export type ShowRouteQueryQueryHookResult = ReturnType<typeof useShowRouteQueryQuery>;
export type ShowRouteQueryLazyQueryHookResult = ReturnType<typeof useShowRouteQueryLazyQuery>;
export type ShowRouteQuerySuspenseQueryHookResult = ReturnType<typeof useShowRouteQuerySuspenseQuery>;
export type ShowRouteQueryQueryResult = Apollo.QueryResult<ShowRouteQueryQuery, ShowRouteQueryQueryVariables>;
export const TrackRouteQueryDocument = gql`
    query TrackRouteQuery($trackId: ID!) {
  track(id: $trackId) {
    id
    durationMs
    name
    album {
      id
      albumType
      name
      images {
        url
        vibrantColor(format: RGB, alpha: 0.9) @client
      }
      ...AlbumTracksTable_album
    }
    artists {
      id
      name
      topTracks {
        id
        ...ArtistTopTracks_tracks
      }
      ...ArtistTile_artist
    }
  }
}
    ${AlbumTracksTableAlbumFragmentDoc}
${ArtistTopTracksTracksFragmentDoc}
${ArtistTileArtistFragmentDoc}`;

/**
 * __useTrackRouteQueryQuery__
 *
 * To run a query within a React component, call `useTrackRouteQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useTrackRouteQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTrackRouteQueryQuery({
 *   variables: {
 *      trackId: // value for 'trackId'
 *   },
 * });
 */
export function useTrackRouteQueryQuery(baseOptions: Apollo.QueryHookOptions<TrackRouteQueryQuery, TrackRouteQueryQueryVariables> & ({ variables: TrackRouteQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TrackRouteQueryQuery, TrackRouteQueryQueryVariables>(TrackRouteQueryDocument, options);
      }
export function useTrackRouteQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TrackRouteQueryQuery, TrackRouteQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TrackRouteQueryQuery, TrackRouteQueryQueryVariables>(TrackRouteQueryDocument, options);
        }
export function useTrackRouteQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TrackRouteQueryQuery, TrackRouteQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TrackRouteQueryQuery, TrackRouteQueryQueryVariables>(TrackRouteQueryDocument, options);
        }
export type TrackRouteQueryQueryHookResult = ReturnType<typeof useTrackRouteQueryQuery>;
export type TrackRouteQueryLazyQueryHookResult = ReturnType<typeof useTrackRouteQueryLazyQuery>;
export type TrackRouteQuerySuspenseQueryHookResult = ReturnType<typeof useTrackRouteQuerySuspenseQuery>;
export type TrackRouteQueryQueryResult = Apollo.QueryResult<TrackRouteQueryQuery, TrackRouteQueryQueryVariables>;