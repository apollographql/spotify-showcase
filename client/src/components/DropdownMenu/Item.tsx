import { ReactNode } from 'react';
import cx from 'classnames';
import { Link, LinkProps } from 'react-router-dom';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import type { DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu';
import styles from './Item.module.scss';
import { ExternalLink } from 'lucide-react';

interface ItemProps {
  children?: ReactNode;
  disabled?: boolean;
  onSelect?: DropdownMenuItemProps['onSelect'];
  to?: LinkProps['to'];
}

const Item = ({ children, disabled, onSelect, to }: ItemProps) => {
  const props = { children, className: styles.item };

  const isExternal =
    typeof to === 'string' && (to.startsWith('http') || to?.match(/\.[a-z]+$/));

  return (
    <Dropdown.Item asChild disabled={disabled} onSelect={onSelect}>
      <li className={styles.container}>
        {isExternal ? (
          <a
            {...props}
            href={to}
            target="_blank"
            rel="noreferrer"
            className={cx(styles.item, 'flex items-center justify-between')}
          >
            {props.children}
            <ExternalLink size="1.25rem" strokeWidth={1.5} />
          </a>
        ) : to ? (
          <Link to={to} {...props} />
        ) : (
          <button {...props} />
        )}
      </li>
    </Dropdown.Item>
  );
};

export default Item;
