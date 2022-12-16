import { ReactNode } from 'react';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import type { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';
import styles from './Menu.module.scss';

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
        <ul className={styles.menu}>{children}</ul>
      </Dropdown.Content>
    </Dropdown.Portal>
  );
};

export default Menu;
