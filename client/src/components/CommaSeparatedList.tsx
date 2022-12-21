import {
  Children,
  ElementType,
  Fragment,
  ReactNode,
  isValidElement,
} from 'react';
import { PolymorphicComponentProps } from '../utils/types';

type CommaSeparatedListProps<TElement extends ElementType = 'span'> =
  PolymorphicComponentProps<
    TElement,
    {
      children: ReactNode;
    }
  >;

const CommaSeparatedList = <TElement extends ElementType = 'span'>({
  as,
  children,
  ...props
}: CommaSeparatedListProps<TElement>) => {
  const Element = as || 'span';

  return (
    <Element {...props}>
      {Children.toArray(children).map((child, index, list) => {
        const key = isValidElement(child) ? child.key : index;

        return (
          <Fragment key={key}>
            {child}
            {index !== list.length - 1 && ', '}
          </Fragment>
        );
      })}
    </Element>
  );
};

export default CommaSeparatedList;
