import { forwardRef, ComponentPropsWithRef } from 'react';
import cx from 'classnames';

type TextFieldProps = ComponentPropsWithRef<'input'>;

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        type={type}
        className={cx(
          className,
          'h-10 rounded bg-[#333] px-4 text-sm text-white disabled:cursor-not-allowed disabled:opacity-50'
        )}
      />
    );
  }
);

export default TextField;
