import { ReactNode } from 'react';
import cx from 'classnames';
import * as Tabs from '@radix-ui/react-tabs';

interface ContentProps {
  children?: ReactNode;
  className?: string;
  id: string;
}

const Content = ({ children, className, id }: ContentProps) => {
  return (
    <Tabs.Content value={id} className={cx('outline-0', className)}>
      {children}
    </Tabs.Content>
  );
};

export default Content;
