import { CSSProperties, ElementType } from 'react';
import { LucideProps } from 'lucide-react';
import cx from 'classnames';
import styles from './GradientIcon.module.scss';

type BackgroundColor = CSSProperties['backgroundColor'];
type Size = CSSProperties['width'];

interface GradientIconProps {
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
      className={cx(styles.gradientIcon, className)}
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
