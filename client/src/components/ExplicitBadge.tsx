import cx from 'classnames';
import styles from './ExplicitBadge.module.scss';

interface ExplicitBadgeProps {
  className?: string;
}

const ExplicitBadge = ({ className }: ExplicitBadgeProps) => {
  return (
    <span
      className={cx(styles.explicitBadge, className)}
      aria-label="Explicit"
      title="Explicit"
    >
      E
    </span>
  );
};

export default ExplicitBadge;
