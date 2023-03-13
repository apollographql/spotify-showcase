import { forwardRef, ReactElement } from 'react';
import { LucideProps } from 'lucide-react';
import Tooltip from './Tooltip';
import cx from 'classnames';

interface PlaybarControlButtonProps {
  active?: boolean;
  disallowed: boolean;
  icon: ReactElement<LucideProps>;
  tooltip: string;
  onClick?: () => void;
}

const PlaybarControlButton = forwardRef<
  HTMLButtonElement,
  PlaybarControlButtonProps
>(({ active, disallowed, icon, onClick, tooltip }, ref) => {
  return (
    <Tooltip content={tooltip}>
      <button
        ref={ref}
        className={cx(
          'flex items-center justify-center border-none bg-transparent text-muted p-0 cursor-pointer transition-colors ease-out w-6 h-6 hover:text-primary active:text-muted disabled:cursor-not-allowed disabled:text-disabled',
          {
            'text-theme relative hover:text-theme-light after:absolute after:block after:bg-current after:rounded after:w-1 after:h-1 after:left-1/2 after:-bottom-2 after:-translate-x-1/2':
              active,
          }
        )}
        disabled={disallowed}
        onClick={onClick}
      >
        {icon}
      </button>
    </Tooltip>
  );
});

export default PlaybarControlButton;
