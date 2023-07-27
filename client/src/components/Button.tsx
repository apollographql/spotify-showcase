import { ReactNode, ElementType, forwardRef, ReactElement } from 'react';
import cx from 'classnames';
import {
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from '../utils/types';

export type ButtonProps<TButtonElement extends ElementType = 'button'> =
  PolymorphicComponentPropsWithRef<
    TButtonElement,
    {
      children: ReactNode;
      className?: string;
      size?: 'xs' | 'sm' | 'md';
      variant: 'primary' | 'secondary' | 'ghost' | 'hollow';
    }
  >;

type ButtonComponent = <TButtonElement extends ElementType = 'button'>(
  props: ButtonProps<TButtonElement>
) => ReactElement | ReactNode | null;

const Button: ButtonComponent = forwardRef(function Button<
  TButtonElement extends ElementType = 'button',
>(
  {
    as,
    children,
    className,
    size = 'md',
    variant,
    ...props
  }: ButtonProps<TButtonElement>,
  ref?: PolymorphicRef<TButtonElement>
) {
  const ButtonElement = as || 'button';

  return (
    <ButtonElement
      {...props}
      ref={ref}
      data-size={size}
      className={cx(
        className,
        'inline-flex scale-100 transform-gpu cursor-pointer items-center rounded-[10rem] border-2 border-solid text-xl uppercase transition-all duration-150 ease-in-out [backface-visibility:hidden]',
        'hover:scale-[1.05] hover:no-underline aria-expanded:scale-[1.05]',
        'focus:outline-0',
        {
          ['text-xxs py-2 px-5 tracking-wide']: size === 'xs',
          ['py-3 px-8 text-xs tracking-wide']: size === 'sm',
          ['py-3 px-9 text-base']: size === 'md',
          ['bg-green border-green hover:bg-green-light hover:border-green-light text-white']:
            variant === 'primary',
          ['border-offwhite bg-transparent text-white hover:border-white']:
            variant === 'hollow',
          ['hover:background-black-pure/10 border-transparent bg-transparent text-white']:
            variant === 'ghost',
          'text-black-base border-white bg-white': variant === 'secondary',
        }
      )}
    >
      {children}
    </ButtonElement>
  );
});

export default Button;
