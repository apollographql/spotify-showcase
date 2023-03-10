import { CSSProperties, ReactNode } from 'react';
import Flex from '../Flex';

interface ContentProps {
  children?: ReactNode;
  gap?: CSSProperties['gap'];
}

const Content = ({ children, gap = '1rem' }: ContentProps) => {
  return (
    <Flex
      className="bg-black-pure bg-opacity-50 p-[var(--main-content--padding)]"
      direction="column"
      flex={1}
      gap={gap}
    >
      {children}
    </Flex>
  );
};

export default Content;
