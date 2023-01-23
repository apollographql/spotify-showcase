import { ReactNode } from 'react';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { ChevronRight } from 'lucide-react';

interface SubMenuProps {
  children: ReactNode;
  content: ReactNode;
}

const SubMenu = ({ children, content }: SubMenuProps) => {
  return (
    <ContextMenu.Sub>
      <ContextMenu.SubTrigger className="data-open:bg-white/10 flex cursor-pointer items-center justify-between gap-1 rounded-sm p-2 hover:bg-white/10 hover:outline-0">
        {children}
        <ChevronRight size="1em" />
      </ContextMenu.SubTrigger>
      <ContextMenu.Portal>
        <ContextMenu.SubContent
          className="bg-surface max-w[350px] z-10 max-h-[calc(100vh-1rem*2)] min-w-[160px] overflow-auto rounded p-1 text-sm text-white shadow-xl"
          collisionPadding={20}
        >
          {content}
        </ContextMenu.SubContent>
      </ContextMenu.Portal>
    </ContextMenu.Sub>
  );
};

export default SubMenu;
