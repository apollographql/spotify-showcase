import { cloneElement, ReactElement } from 'react';
import cx from 'classnames';
import EntityLink from '../EntityLink';
import Flex from '../Flex';

interface DetailsProps {
  items: ReactElement[];
}

const Details = ({ items }: DetailsProps) => {
  return (
    <Flex
      className='text-sm [&>:not(:first-child)]:before:my-0 [&>:not(:first-child)]:before:mx-1 [&>:not(:first-child)]:before:content-["·"]'
      alignItems="center"
    >
      {items.map((child) => {
        switch (child.type) {
          case EntityLink:
            return cloneElement(child, {
              className: cx(child.props?.className, 'text-bold'),
            });
          default:
            return child;
        }
      })}
    </Flex>
  );
};

export default Details;
