export interface Entity {
  __typename:
    | 'Album'
    | 'Artist'
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
  Episode: '/episodes',
  Playlist: '/playlists',
  Show: '/shows',
  Track: '/tracks',
  User: '/users',
};

export const getEntityPathname = (entity: Entity) => {
  return [ENTITYS_TO_PATHS[entity.__typename], entity.id].join('/');
};
