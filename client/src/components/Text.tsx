import { CSSProperties, ElementType, ReactNode } from 'react';
import { PolymorphicComponentProps } from '../utils/types';
import cx from 'classnames';
import styles from './Text.module.scss';

type TextProps<TElement extends ElementType = 'span'> =
  PolymorphicComponentProps<
    TElement,
    {
      color?: 'muted' | 'primary' | 'theme' | 'themeLight';
      children?: ReactNode;
      interactive?: boolean;
      maxLines?: number;
      numericVariant?: 'tabular-nums';
      overflow?: 'ellipsis';
      size?: 'base' | 'lg' | 'sm' | 'xs' | 'xxs';
      uppercase?: boolean;
      weight?: 'normal' | 'bold' | 'black';
      wrap?: boolean;
    }
  >;

interface StyleProps extends CSSProperties {
  '--text--max-lines': CSSProperties['lineClamp'];
}

const Text = <TElement extends ElementType = 'span'>({
  as,
  className,
  color,
  children,
  interactive,
  maxLines,
  numericVariant,
  overflow,
  size,
  uppercase,
  weight,
  wrap = true,
  ...props
}: TextProps<TElement>) => {
  const Element = as || 'span';

  return (
    <Element
      {...props}
      style={{ ...props.style, '--text--max-lines': maxLines } as StyleProps}
      className={cx(className, {
        [styles.color__primary]: color === 'primary',
        [styles.color__muted]: color === 'muted',
        [styles.color__theme]: color === 'theme',
        [styles.color__theme__light]: color === 'themeLight',
        [styles.interactive]: interactive,
        [styles.lineClamp]: maxLines,
        [styles.numericVariant__tabularNums]: numericVariant === 'tabular-nums',
        [styles.overflow__ellipsis]: overflow === 'ellipsis' || maxLines,
        [styles.size__base]: size === 'base',
        [styles.size__lg]: size === 'lg',
        [styles.size__sm]: size === 'sm',
        [styles.size__xs]: size === 'xs',
        [styles.size_xxs]: size === 'xxs',
        [styles.uppercase]: uppercase,
        [styles.weight__normal]: weight === 'normal',
        [styles.weight__bold]: weight === 'bold',
        [styles.weight__black]: weight === 'black',
        [styles.nowrap]: !wrap,
      })}
    >
      {children}
    </Element>
  );
};

export default Text;
