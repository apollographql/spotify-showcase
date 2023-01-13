import { CSSProperties } from 'react';
import cx from 'classnames';
import styles from './AnimatedSoundWave.module.scss';

interface AnimatedSoundWaveProps {
  className?: string;
  size?: CSSProperties['width'];
}

interface StyleProps extends CSSProperties {
  '--animated-sound-wave--size': CSSProperties['width'];
}

const AnimatedSoundWave = ({
  className,
  size = '1rem',
}: AnimatedSoundWaveProps) => {
  return (
    <div
      style={{ '--animated-sound-wave--size': size } as StyleProps}
      className={cx(styles.animatedSoundWave, className)}
    >
      <div className={styles.bar} />
      <div className={styles.bar} />
      <div className={styles.bar} />
      <div className={styles.bar} />
      <div className={styles.bar} />
    </div>
  );
};

export default AnimatedSoundWave;
