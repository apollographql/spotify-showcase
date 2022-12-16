import { ReactNode } from 'react';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import type { DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu';
import styles from './Item.module.scss';

interface ItemProps {
  children?: ReactNode;
  disabled?: boolean;
  onSelect?: DropdownMenuItemProps['onSelect'];
}

const Item = ({ children, disabled, onSelect }: ItemProps) => {
  return (
    <Dropdown.Item asChild disabled={disabled} onSelect={onSelect}>
      <li className={styles.item}>{children}</li>
    </Dropdown.Item>
  );
};

export default Item;
