import { ElementType } from 'react';
import { LucideProps } from 'lucide-react';
import { Link, LinkProps } from 'react-router-dom';
import styles from './Layout.module.scss';

interface NavLinkProps extends LinkProps {
  icon?: ElementType<LucideProps>;
}

const NavLink = ({ children, icon: Icon, ...props }: NavLinkProps) => {
  return (
    <li className={styles.navLink}>
      <Link {...props}>
        {Icon && <Icon size="1.5rem" />}
        {children}
      </Link>
    </li>
  );
};

export default NavLink;
