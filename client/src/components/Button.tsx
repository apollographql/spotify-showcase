import { ReactNode, ComponentPropsWithoutRef, ElementType } from 'react';
import cx from 'classnames';
import styles from './Button.module.scss';

type ButtonProps<TButtonElement extends ElementType> =
  ComponentPropsWithoutRef<TButtonElement> & {
    as?: TButtonElement;
    children: ReactNode;
    className?: string;
    size?: 'xs' | 'sm' | 'md';
    variant: 'primary' | 'ghost' | 'hollow';
  };

const Button = <TButtonElement extends ElementType = 'button'>({
  as,
  children,
  className,
  size = 'md',
  variant,
  ...props
}: ButtonProps<TButtonElement>) => {
  const ButtonElement = as || 'button';

  return (
    <ButtonElement
      {...props}
      className={cx(styles.button, className, {
        [styles[size ?? '']]: size,
        [styles[variant ?? '']]: variant,
      })}
    >
      {children}
    </ButtonElement>
  );
};

export default Button;
