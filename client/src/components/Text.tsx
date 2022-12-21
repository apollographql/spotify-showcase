import { ElementType, ReactNode } from 'react';
import { PolymorphicComponentProps } from '../utils/types';
import cx from 'classnames';
import styles from './Text.module.scss';

type TextProps<TElement extends ElementType = 'span'> =
  PolymorphicComponentProps<
    TElement,
    {
      color?: 'muted' | 'primary';
      children?: ReactNode;
      interactive?: boolean;
      size?: 'base' | 'sm' | 'xs' | 'xxs';
      weight?: 'normal' | 'bold' | 'black';
    }
  >;

const Text = <TElement extends ElementType = 'span'>({
  as,
  className,
  color,
  children,
  interactive,
  size,
  weight,
  ...props
}: TextProps<TElement>) => {
  const Element = as || 'span';

  return (
    <Element
      {...props}
      className={cx(className, {
        [styles.color__primary]: color === 'primary',
        [styles.color__muted]: color === 'muted',
        [styles.interactive]: interactive,
        [styles.size__base]: size === 'base',
        [styles.size__sm]: size === 'sm',
        [styles.size__xs]: size === 'xs',
        [styles.size_xxs]: size === 'xxs',
        [styles.weight__normal]: weight === 'normal',
        [styles.weight__bold]: weight === 'bold',
        [styles.weight__black]: weight === 'black',
      })}
    >
      {children}
    </Element>
  );
};

export default Text;
