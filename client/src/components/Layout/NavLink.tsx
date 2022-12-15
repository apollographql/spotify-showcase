import { cloneElement, ReactElement } from 'react';
import {
  NavLink as ReactRouterNavLink,
  NavLinkProps as ReactRouterNavLinkProps,
} from 'react-router-dom';
import cx from 'classnames';
import styles from './NavLink.module.scss';

interface IconProps {
  size: string;
}

interface NavLinkProps extends ReactRouterNavLinkProps {
  className?: string;
  icon?: ReactElement<IconProps>;
}

const NavLink = ({ children, className, icon, ...props }: NavLinkProps) => {
  return (
    <li className={styles.navLink}>
      <ReactRouterNavLink
        {...props}
        className={({ isActive }) =>
          cx(styles.navLinkAnchor, className, { [styles.active]: isActive })
        }
      >
        <>
          {icon && cloneElement(icon, { size: '1.5rem' })}
          {children}
        </>
      </ReactRouterNavLink>
    </li>
  );
};

export default NavLink;
