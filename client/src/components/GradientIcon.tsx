import { CSSProperties, ElementType } from 'react';
import { LucideProps } from 'lucide-react';
import cx from 'classnames';

type BackgroundColor = CSSProperties['backgroundColor'];
type Size = CSSProperties['width'];

export interface GradientIconProps {
  className?: string;
  backgroundColor: BackgroundColor;
  fill?: LucideProps['fill'];
  size?: Size;
  iconSize?: Size;
  lucideIcon: ElementType<LucideProps>;
}

interface GradientIconStyle extends CSSProperties {
  '--gradient-icon--background-color': BackgroundColor;
  '--gradient-icon--size': Size;
}

const GradientIcon = ({
  className,
  backgroundColor,
  fill = 'currentColor',
  lucideIcon: Icon,
  iconSize = '75%',
  size = '1rem',
}: GradientIconProps) => {
  return (
    <div
      className={cx(
        'aspect-square flex items-center justify-center rounded-sm [background:var(--gradient-icon--background-color)] w-[var(--gradient-icon--size)]',
        className
      )}
      style={
        {
          '--gradient-icon--background-color': backgroundColor,
          '--gradient-icon--size': size,
        } as GradientIconStyle
      }
    >
      <Icon size={iconSize} fill={fill} stroke={fill} />
    </div>
  );
};

export default GradientIcon;
