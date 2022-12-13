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
    inline?: boolean;
    justifyContent?: 'start' | 'center' | 'end';
  };

const Flex = <TElement extends ElementType = 'div'>({
  as,
  alignItems,
  className,
  children,
  inline,
  justifyContent,
  ...props
}: FlexProps<TElement>) => {
  const Element = as || 'div';

  return (
    <Element
      {...props}
      className={cx(styles.Flex, className, {
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
