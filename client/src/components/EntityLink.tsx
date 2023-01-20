import { forwardRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { getEntityPathname, Entity } from '../utils/navigation';

interface EntityLinkProps extends Omit<LinkProps, 'to'> {
  entity: Entity;
}

const EntityLink = forwardRef<HTMLAnchorElement, EntityLinkProps>(
  ({ entity, ...props }, ref) => {
    return <Link ref={ref} {...props} to={getEntityPathname(entity)} />;
  }
);

export default EntityLink;
