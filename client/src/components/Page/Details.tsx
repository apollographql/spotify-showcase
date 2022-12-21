import { cloneElement, ReactElement } from 'react';
import cx from 'classnames';
import EntityLink from '../EntityLink';
import Flex from '../Flex';
import styles from './Page.module.scss';

interface DetailsProps {
  items: ReactElement[];
}

const Details = ({ items }: DetailsProps) => {
  return (
    <Flex className={styles.page__details} alignItems="center">
      {items.map((child) => {
        switch (child.type) {
          case EntityLink:
            return cloneElement(child, {
              className: cx(child.props?.className, styles.page__entityLink),
            });
          default:
            return child;
        }
      })}
    </Flex>
  );
};

export default Details;
