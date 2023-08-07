import { ReactNode } from 'react';
import Layout from '../Layout';
import PlaybackStateSubscriber from '../PlaybackStateSubscriber';

interface MainProps {
  children: ReactNode;
}

export const Main = ({ children }: MainProps) => {
  return (
    <Layout.Main>
      <PlaybackStateSubscriber />
      {children}
    </Layout.Main>
  );
};
