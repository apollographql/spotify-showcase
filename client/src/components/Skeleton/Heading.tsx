import { CSSProperties } from 'react';
import cx from 'classnames';
import Base from './Base';

interface TitleProps {
  className?: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  width?: CSSProperties['width'];
  fontSize?: CSSProperties['fontSize'];
}

interface StyleProps extends CSSProperties {
  '--skeleton--heading--width': CSSProperties['width'];
  '--skeleton--heading--font-size': CSSProperties['fontSize'];
}

const Heading = ({ className, fontSize, level, width }: TitleProps) => {
  return (
    <Base
      as={`h${level}`}
      className={cx(
        '[font-size:var(--skeleton--heading--font-size)] h-[1em] w-[var(--skeleton--heading--width,100%)]',
        className,
        {
          '[--skeleton--heading--font-size:3rem]': level === 1,
          '[--skeleton--heading--font-size:2rem]': level === 2,
        }
      )}
      style={
        {
          '--skeleton--heading--width': width,
          '--skeleton--heading--font-size': fontSize,
        } as StyleProps
      }
    />
  );
};

export default Heading;
