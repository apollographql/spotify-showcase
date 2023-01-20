import { ReactNode } from 'react';
import * as ContextMenu from '@radix-ui/react-context-menu';

interface ItemProps {
  children?: ReactNode;
  disabled?: boolean;
  onSelect?: ContextMenu.MenuItemProps['onSelect'];
}

const Item = ({ children, disabled, onSelect }: ItemProps) => {
  return (
    <ContextMenu.Item
      asChild
      disabled={disabled}
      className="rounded-sm p-2 hover:bg-white/10 hover:outline-0"
      onSelect={onSelect}
    >
      {children}
    </ContextMenu.Item>
  );
};

export default Item;
