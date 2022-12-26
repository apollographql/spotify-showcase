import { ElementType } from 'react';
import DelimitedList, { DelimitedListProps } from './DelimitedList';

type CommaSeparatedListProps<TElement extends ElementType = 'span'> = Omit<
  DelimitedListProps<TElement>,
  'delimiter'
>;

const CommaSeparatedList = <TElement extends ElementType = 'span'>({
  children,
  ...props
}: CommaSeparatedListProps<TElement>) => {
  return (
    <DelimitedList {...props} delimiter=", ">
      {children}
    </DelimitedList>
  );
};

export default CommaSeparatedList;
