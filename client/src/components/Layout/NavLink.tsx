import { cloneElement, forwardRef, ReactElement } from 'react';
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

const NavLink = forwardRef<HTMLLIElement, NavLinkProps>(
  ({ children, className, icon, ...props }, ref) => {
    return (
      <li className={styles.navLink} ref={ref}>
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
  }
);

export default NavLink;
