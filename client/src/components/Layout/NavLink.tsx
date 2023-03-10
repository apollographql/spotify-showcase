import { cloneElement, forwardRef, ReactElement } from 'react';
import {
  NavLink as ReactRouterNavLink,
  NavLinkProps as ReactRouterNavLinkProps,
} from 'react-router-dom';
import cx from 'classnames';

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
      <li
        className="leading-none py-3 px-0 text-muted transition-colors duration-200 ease-out hover:text-primary"
        ref={ref}
      >
        <ReactRouterNavLink
          {...props}
          className={({ isActive }) =>
            cx(
              'flex items-center gap-4 text-sm transition-color duration-200 ease-out hover:no-underline',
              className,
              { 'text-primary': isActive }
            )
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
