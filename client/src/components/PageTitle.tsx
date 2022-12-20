import { ReactNode } from 'react';
import cx from 'classnames';
import styles from './PageTitle.module.scss';

interface PageTitleProps {
  className?: string;
  children?: ReactNode;
}

const PageTitle = ({ className, children }: PageTitleProps) => {
  return <h1 className={cx(styles.pageTitle, className)}>{children}</h1>;
};

export default PageTitle;
