export interface Entity {
  __typename:
    | 'Album'
    | 'Artist'
    | 'CurrentUserProfile'
    | 'Episode'
    | 'Playlist'
    | 'Show'
    | 'Track'
    | 'User';
  id: string;
}

const ENTITYS_TO_PATHS: Record<string, string> = {
  Album: '/albums',
  Artist: '/artists',
  CurrentUserProfile: '/users',
  Episode: '/episodes',
  Playlist: '/playlists',
  Show: '/shows',
  Track: '/tracks',
  User: '/users',
};

const isLikedSongsPlaylist = (entity: Entity) => {
  return entity.__typename === 'Playlist' && entity.id === 'collection:tracks';
};

const isYourEpisodesPlaylist = (entity: Entity) => {
  return (
    entity.__typename === 'Playlist' && entity.id === 'collection:episodes'
  );
};

export const getEntityPathname = (entity: Entity) => {
  if (isLikedSongsPlaylist(entity)) {
    return '/collection/tracks';
  }

  if (isYourEpisodesPlaylist(entity)) {
    return '/collection/episodes';
  }

  return [ENTITYS_TO_PATHS[entity.__typename], entity.id].join('/');
};
