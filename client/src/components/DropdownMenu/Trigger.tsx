import { ReactNode } from 'react';
import cx from 'classnames';
import { ChevronDown } from 'lucide-react';
import Button, { ButtonProps } from '../Button';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import styles from './Trigger.module.scss';

type TriggerProps = ButtonProps & {
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
};

const Trigger = ({ className, children, disabled, ...props }: TriggerProps) => {
  return (
    <Dropdown.Trigger asChild disabled={disabled}>
      <Button {...props} className={cx(className, styles.trigger)}>
        {children}
        <ChevronDown className={styles.chevron} size="1rem" />
      </Button>
    </Dropdown.Trigger>
  );
};

export default Trigger;
