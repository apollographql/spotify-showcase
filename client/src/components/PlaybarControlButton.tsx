import { ReactElement } from 'react';
import { LucideProps } from 'lucide-react';
import Tooltip from './Tooltip';
import cx from 'classnames';
import styles from './PlaybarControlButton.module.scss';

interface PlaybarControlButtonProps {
  active?: boolean;
  disallowed: boolean;
  icon: ReactElement<LucideProps>;
  tooltip: string;
  onClick?: () => void;
}

const PlaybarControlButton = ({
  active,
  disallowed,
  icon,
  onClick,
  tooltip,
}: PlaybarControlButtonProps) => {
  return (
    <Tooltip content={tooltip}>
      <button
        className={cx(styles.playbarControlButton, { [styles.active]: active })}
        disabled={disallowed}
        onClick={onClick}
      >
        {icon}
      </button>
    </Tooltip>
  );
};

export default PlaybarControlButton;
