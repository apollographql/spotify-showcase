import { ReactNode } from 'react';
import cx from 'classnames';
import { Link, LinkProps } from 'react-router-dom';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import type { DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu';
import { ExternalLink } from 'lucide-react';

interface ItemProps {
  children?: ReactNode;
  disabled?: boolean;
  onSelect?: DropdownMenuItemProps['onSelect'];
  to?: LinkProps['to'];
}

const Item = ({ children, disabled, onSelect, to }: ItemProps) => {
  const props = {
    children,
    className: 'flex items-center p-2 text-sm hover:no-underline',
  };

  const isExternal =
    typeof to === 'string' && (to.startsWith('http') || to?.match(/\.[a-z]+$/));

  return (
    <Dropdown.Item asChild disabled={disabled} onSelect={onSelect}>
      <li
        className={
          'outline-0 rounded data-[highlighted]:bg-surface-active data-[highlighted]:cursor-pointer data-[disabled]:text-muted data-[disabled]:pointer-events-none'
        }
      >
        {isExternal ? (
          <a
            {...props}
            href={to}
            target="_blank"
            rel="noreferrer"
            className={cx(
              // eslint-disable-next-line react/prop-types
              props.className,
              'justify-between'
            )}
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
