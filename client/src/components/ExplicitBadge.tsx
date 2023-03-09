import cx from 'classnames';

interface ExplicitBadgeProps {
  className?: string;
}

const ExplicitBadge = ({ className }: ExplicitBadgeProps) => {
  return (
    <span
      className={cx(
        'inline-flex justify-center items-center h-4 p-1 text-[0.5625rem] text-black-base bg-[hsla(0,0%,100%,0.6)] rounded-sm',
        className
      )}
      aria-label="Explicit"
      title="Explicit"
    >
      E
    </span>
  );
};

export default ExplicitBadge;
