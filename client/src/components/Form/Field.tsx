import { ReactNode } from 'react';
import cx from 'classnames';

interface FieldProps {
  children?: ReactNode;
  orientation?: 'vertical' | 'horizontal';
}

const Field = ({ children, orientation = 'vertical' }: FieldProps) => {
  return (
    <div
      className={cx('flex flex-1 gap-2', {
        'flex-col': orientation === 'vertical',
        'items-center justify-between': orientation === 'horizontal',
      })}
    >
      {children}
    </div>
  );
};

export default Field;
