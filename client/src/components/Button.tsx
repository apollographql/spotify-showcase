import { ReactNode, ElementType, forwardRef, ReactElement } from 'react';
import cx from 'classnames';
import styles from './Button.module.scss';
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
      variant: 'primary' | 'ghost' | 'hollow';
    }
  >;

type ButtonCompoment = <TButtonElement extends ElementType = 'button'>(
  props: ButtonProps<TButtonElement>
) => ReactElement | null;

const Button: ButtonCompoment = forwardRef(function Button<
  TButtonElement extends ElementType = 'button'
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
      className={cx(styles.button, className, {
        [styles[size ?? '']]: size,
        [styles[variant ?? '']]: variant,
      })}
    >
      {children}
    </ButtonElement>
  );
});

export default Button;
