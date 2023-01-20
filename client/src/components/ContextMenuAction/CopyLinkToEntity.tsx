import { ReactNode } from 'react';
import { copyToClipboard } from '../../utils/copyToClipboard';
import { Entity, getEntityPathname } from '../../utils/navigation';
import ContextMenu from '../ContextMenu/ContextMenu';

interface CopyLinkToEntityProps {
  children?: ReactNode;
  entity: Entity;
}

const LABELS: Record<Entity['__typename'], string> = {
  Album: 'Copy album link',
  Artist: 'Copy link to artist',
  Episode: 'Copy episode link',
  Playlist: 'Copy link to playlist',
  Show: 'Copy show link',
  Track: 'Copy song link',
  User: 'Copy link to profile',
};

const CopyLinkToEntity = ({
  entity,
  children = LABELS[entity.__typename],
}: CopyLinkToEntityProps) => {
  return (
    <ContextMenu.Action
      onSelect={() => {
        copyToClipboard(
          [window.location.origin, getEntityPathname(entity)].join('')
        );
      }}
    >
      {children}
    </ContextMenu.Action>
  );
};

export default CopyLinkToEntity;
