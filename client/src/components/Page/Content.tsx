import { CSSProperties, ReactNode } from 'react';
import cx from 'classnames';
import Flex from '../Flex';

interface ContentProps {
  children?: ReactNode;
  gap?: CSSProperties['gap'];
}

const Content = ({ children, gap = '1rem' }: ContentProps) => {
  return (
    <div className="bg-black-base relative">
      <div
        className={cx(
          'absolute h-[230px] w-full [background:var(--backdrop-color)] transition duration-200 ease-out',
          'after:absolute after:inset-0 after:bg-[linear-gradient(rgba(0,0,0,0.6)_0,var(--background--base)_100%)]'
        )}
      />
      <Flex
        className="p-[var(--main-content--padding)] isolate"
        direction="column"
        flex={1}
        gap={gap}
      >
        {children}
      </Flex>
    </div>
  );
};

export default Content;
