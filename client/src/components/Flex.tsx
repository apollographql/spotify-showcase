import {
  CSSProperties,
  ComponentPropsWithoutRef,
  ReactNode,
  ElementType,
} from 'react';
import cx from 'classnames';
import styles from './Flex.module.scss';

type FlexProps<TElement extends ElementType> =
  ComponentPropsWithoutRef<TElement> & {
    as?: TElement;
    alignItems?: 'start' | 'center' | 'end';
    children?: ReactNode;
    className?: string;
    direction?: 'row' | 'column';
    flex?: CSSProperties['flex'];
    gap?: CSSProperties['gap'];
    inline?: boolean;
    justifyContent?: 'start' | 'center' | 'end';
  };

interface FlexStyle extends CSSProperties {
  '--gap': CSSProperties['gap'];
  '--flex': CSSProperties['flex'];
}

const Flex = <TElement extends ElementType = 'div'>({
  as,
  alignItems,
  className,
  children,
  direction,
  flex,
  inline,
  gap,
  justifyContent,
  ...props
}: FlexProps<TElement>) => {
  const Element = as || 'div';

  return (
    <Element
      {...props}
      style={{ '--gap': gap, '--flex': flex } as FlexStyle}
      className={cx(styles.Flex, className, {
        [styles[`direction-${direction}`]]: direction,
        [styles[`alignItems-${alignItems}`]]: alignItems,
        [styles[`justifyContent-${justifyContent}`]]: justifyContent,
        [styles.inline]: inline,
      })}
    >
      {children}
    </Element>
  );
};

export default Flex;
