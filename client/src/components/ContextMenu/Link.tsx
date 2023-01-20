import Item from './Item';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import { ReactNode } from 'react';

interface LinkProps {
  children: ReactNode;
  disabled?: boolean;
  to: RouterLinkProps['to'];
}

const Link = ({ children, disabled, to }: LinkProps) => {
  return (
    <Item disabled={disabled}>
      <RouterLink to={to} className="block hover:no-underline">
        {children}
      </RouterLink>
    </Item>
  );
};

export default Link;
