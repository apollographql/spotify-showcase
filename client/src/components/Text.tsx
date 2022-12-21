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
      size?: 'base';
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
