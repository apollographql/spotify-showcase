import { CSSProperties, ElementType } from 'react';
import { LucideProps } from 'lucide-react';
import styles from './GradientIcon.module.scss';

type BackgroundColor = CSSProperties['backgroundColor'];
type Size = CSSProperties['width'];

interface GradientIconProps {
  backgroundColor: BackgroundColor;
  size?: Size;
  iconSize?: Size;
  lucideIcon: ElementType<LucideProps>;
}

interface GradientIconStyle extends CSSProperties {
  '--gradient-icon--background-color': BackgroundColor;
  '--gradient-icon--size': Size;
}

const GradientIcon = ({
  backgroundColor,
  lucideIcon: Icon,
  iconSize = '75%',
  size = '1rem',
}: GradientIconProps) => {
  return (
    <div
      className={styles.gradientIcon}
      style={
        {
          '--gradient-icon--background-color': backgroundColor,
          '--gradient-icon--size': size,
        } as GradientIconStyle
      }
    >
      <Icon size={iconSize} fill="currentColor" />
    </div>
  );
};

export default GradientIcon;
