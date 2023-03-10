import {
  CSSProperties,
  ComponentPropsWithoutRef,
  ReactNode,
  ElementType,
} from 'react';
import cx from 'classnames';

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
    justifyContent?: 'start' | 'center' | 'end' | 'space-between';
  };

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
      style={{ gap, flex }}
      className={cx(inline ? 'inline-flex' : 'flex', className, {
        'flex-row': direction === 'row',
        'flex-col': direction === 'column',
        'items-start': alignItems === 'start',
        'items-center': alignItems === 'center',
        'items-end': alignItems === 'end',
        'justify-start': justifyContent === 'start',
        'justify-center': justifyContent === 'center',
        'justify-end': justifyContent === 'end',
        'justify-between': justifyContent === 'space-between',
      })}
    >
      {children}
    </Element>
  );
};

export default Flex;
