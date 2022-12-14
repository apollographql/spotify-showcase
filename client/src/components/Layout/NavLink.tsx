import { cloneElement, ReactElement } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import styles from './NavLink.module.scss';

interface IconProps {
  size: string;
}

interface NavLinkProps extends LinkProps {
  icon?: ReactElement<IconProps>;
}

const NavLink = ({ children, icon, ...props }: NavLinkProps) => {
  return (
    <li className={styles.navLink}>
      <Link {...props}>
        {icon && cloneElement(icon, { size: '1.5rem' })}
        {children}
      </Link>
    </li>
  );
};

export default NavLink;
