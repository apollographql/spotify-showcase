import { ReactElement } from 'react';
import { LucideProps } from 'lucide-react';
import cx from 'classnames';
import styles from './PlaybarControlButton.module.scss';

interface PlaybarControlButtonProps {
  active?: boolean;
  disallowed: boolean;
  icon: ReactElement<LucideProps>;
  onClick?: () => void;
}

const PlaybarControlButton = ({
  active,
  disallowed,
  icon,
  onClick,
}: PlaybarControlButtonProps) => {
  return (
    <button
      className={cx(styles.playbarControlButton, { [styles.active]: active })}
      disabled={disallowed}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default PlaybarControlButton;
