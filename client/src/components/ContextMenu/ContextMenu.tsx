import * as RadixContextMenu from '@radix-ui/react-context-menu';
import { ReactNode } from 'react';

import Action from './Action';
import Link from './Link';
import Separator from './Separator';
import SubMenu from './SubMenu';

interface ContextMenuProps {
  disabled?: boolean;
  children: ReactNode;
  content: ReactNode;
}

const ContextMenu = ({ disabled, children, content }: ContextMenuProps) => {
  return (
    <RadixContextMenu.Root>
      <RadixContextMenu.Trigger disabled={disabled} asChild>
        {children}
      </RadixContextMenu.Trigger>
      <RadixContextMenu.Portal>
        <RadixContextMenu.Content className="bg-surface min-w-[160px] max-w-[350px] rounded p-1 text-sm text-white shadow-lg">
          {content}
        </RadixContextMenu.Content>
      </RadixContextMenu.Portal>
    </RadixContextMenu.Root>
  );
};

ContextMenu.Action = Action;
ContextMenu.Link = Link;
ContextMenu.Separator = Separator;
ContextMenu.SubMenu = SubMenu;

export default ContextMenu;
