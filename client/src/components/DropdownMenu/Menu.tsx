import { ReactNode } from 'react';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import type { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';

interface MenuProps {
  align?: DropdownMenuContentProps['align'];
  children?: ReactNode;
}

const Menu = ({ align, children }: MenuProps) => {
  return (
    <Dropdown.Portal>
      <Dropdown.Content
        asChild
        align={align}
        sideOffset={5}
        avoidCollisions={false}
      >
        <ul
          className={
            'text-primary list-none bg-surface p-[0.375rem] min-w-[220px] rounded shadow-lg will-change-transform data-side-bottom:animate-slide-up-fade'
          }
        >
          {children}
        </ul>
      </Dropdown.Content>
    </Dropdown.Portal>
  );
};

export default Menu;
