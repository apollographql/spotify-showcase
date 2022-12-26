import {
  Children,
  ElementType,
  Fragment,
  ReactNode,
  isValidElement,
} from 'react';
import { PolymorphicComponentProps } from '../utils/types';

export type DelimitedListProps<TElement extends ElementType = 'span'> =
  PolymorphicComponentProps<
    TElement,
    { children: ReactNode; delimiter: string }
  >;

const DelimitedList = <TElement extends ElementType = 'span'>({
  as,
  children,
  delimiter,
  ...props
}: DelimitedListProps<TElement>) => {
  const Element = as || 'span';

  return (
    <Element {...props}>
      {Children.toArray(children).map((child, index, list) => {
        const key = isValidElement(child) ? child.key : index;

        return (
          <Fragment key={key}>
            {child}
            {index !== list.length - 1 && delimiter}
          </Fragment>
        );
      })}
    </Element>
  );
};

export default DelimitedList;
