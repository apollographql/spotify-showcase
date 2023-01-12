import { ReactElement } from 'react';
import { LucideProps } from 'lucide-react';
import styles from './PlaybarControlButton.module.scss';

interface PlaybarControlButtonProps {
  disallowed: boolean;
  icon: ReactElement<LucideProps>;
  onClick?: () => void;
}

const PlaybarControlButton = ({
  disallowed,
  icon,
  onClick,
}: PlaybarControlButtonProps) => {
  return (
    <button
      className={styles.playbarControlButton}
      disabled={disallowed}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default PlaybarControlButton;
