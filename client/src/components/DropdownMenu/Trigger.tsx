import { ReactNode } from 'react';
import cx from 'classnames';
import { ChevronDown } from 'lucide-react';
import Button, { ButtonProps } from '../Button';
import * as Dropdown from '@radix-ui/react-dropdown-menu';

type TriggerProps = ButtonProps & {
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
};

const Trigger = ({ className, children, disabled, ...props }: TriggerProps) => {
  return (
    <Dropdown.Trigger asChild disabled={disabled}>
      <Button {...props} className={cx(className, 'flex gap-2 group')}>
        {children}
        <ChevronDown
          className={
            'group-data-open:rotate-180 transition-transform duration-150 ease-out'
          }
          size="1rem"
        />
      </Button>
    </Dropdown.Trigger>
  );
};

export default Trigger;
