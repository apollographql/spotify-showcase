import { forwardRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface EntityLinkProps extends Omit<LinkProps, 'to'> {
  entity: Entity;
}

interface Entity {
  __typename: string;
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

const EntityLink = forwardRef<HTMLAnchorElement, EntityLinkProps>(
  ({ entity, ...props }, ref) => {
    const path = ENTITYS_TO_PATHS[entity.__typename];

    return path ? (
      <Link ref={ref} {...props} to={`${path}/${entity.id}`} />
    ) : null;
  }
);

export default EntityLink;
