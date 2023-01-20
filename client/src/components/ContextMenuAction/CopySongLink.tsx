import ContextMenu from '../ContextMenu';
import { copyToClipboard } from '../../utils/copyToClipboard';

interface CopySongLinkProps {
  href: string;
}

const CopySongLink = ({ href }: CopySongLinkProps) => {
  return (
    <ContextMenu.Action onSelect={() => copyToClipboard(href)}>
      Copy song link
    </ContextMenu.Action>
  );
};

export default CopySongLink;
