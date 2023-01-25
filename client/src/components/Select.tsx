import { ComponentPropsWithoutRef } from 'react';
import cx from 'classnames';

type SelectProps = ComponentPropsWithoutRef<'select'>;

const Select = ({ className, ...props }: SelectProps) => {
  return (
    <select
      className={cx(
        className,
        'text-offwhite h-8 rounded bg-[#333] px-2 text-sm disabled:cursor-not-allowed disabled:opacity-50'
      )}
      {...props}
    />
  );
};

export default Select;
