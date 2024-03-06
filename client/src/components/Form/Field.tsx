import { ReactNode } from 'react';
import cx from 'classnames';

interface FieldProps {
  className?: string;
  children?: ReactNode;
  orientation?: 'vertical' | 'horizontal';
}

const Field = ({
  className,
  children,
  orientation = 'vertical',
}: FieldProps) => {
  return (
    <div
      className={cx('flex flex-1 gap-2', className, {
        'flex-col': orientation === 'vertical',
        'items-center justify-between': orientation === 'horizontal',
      })}
    >
      {children}
    </div>
  );
};

export default Field;
