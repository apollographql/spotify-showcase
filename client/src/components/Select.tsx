import { forwardRef, ComponentPropsWithRef } from 'react';
import cx from 'classnames';

type SelectProps = ComponentPropsWithRef<'select'>;

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => {
    return (
      <select
        {...props}
        ref={ref}
        className={cx(
          className,
          'text-offwhite h-8 rounded bg-[#333] px-2 text-sm disabled:cursor-not-allowed disabled:opacity-50'
        )}
      />
    );
  }
);

export default Select;
