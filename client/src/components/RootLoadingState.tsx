import cx from 'classnames';
import Layout from './Layout';
import Skeleton from './Skeleton';
import headerStyles from './Layout/Header.module.scss';
import { randomBetween } from '../utils/common';
import { range } from '../utils/lists';
import styles from './RootLoadingState.module.scss';
import Flex from './Flex';

const RootLoadingState = () => {
  const skeletons = range(0, randomBetween(10, 15));

  return (
    <Layout>
      <Layout.Sidebar>
        <Layout.Sidebar.Section>
          {skeletons.map((num) => (
            <li key={num} className={styles.skeleton__playlist}>
              <Skeleton.Text key={num} width={`${randomBetween(40, 60)}%`} />
            </li>
          ))}
        </Layout.Sidebar.Section>
      </Layout.Sidebar>
      <Layout.Main>
        <header className={cx(headerStyles.header, styles.header)}>
          <Flex gap="0.5rem" alignItems="center">
            <Skeleton.Avatar size="2rem" />
            <Skeleton.Text width="10ch" />
          </Flex>
        </header>
      </Layout.Main>
    </Layout>
  );
};

export default RootLoadingState;
