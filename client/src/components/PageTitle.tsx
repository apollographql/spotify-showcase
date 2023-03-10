import { ReactNode } from 'react';
import cx from 'classnames';

interface PageTitleProps {
  className?: string;
  children?: ReactNode;
}

const PageTitle = ({ className, children }: PageTitleProps) => {
  return <h1 className={cx('text-5xl mb-8', className)}>{children}</h1>;
};

export default PageTitle;
