import { copyToClipboard } from '../../utils/copyToClipboard';
import { Entity, getEntityPathname } from '../../utils/navigation';
import ContextMenu from '../ContextMenu/ContextMenu';

interface CopyLinkToEntityProps {
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

const CopyLinkToEntity = ({ entity }: CopyLinkToEntityProps) => {
  return (
    <ContextMenu.Action
      onSelect={() => {
        copyToClipboard(
          [window.location.origin, getEntityPathname(entity)].join('')
        );
      }}
    >
      {LABELS[entity.__typename]}
    </ContextMenu.Action>
  );
};

export default CopyLinkToEntity;
