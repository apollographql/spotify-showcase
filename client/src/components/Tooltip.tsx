import { ReactNode } from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import styles from './Tooltip.module.scss';

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  delay?: number;
  side?: RadixTooltip.TooltipContentProps['side'];
}

const Tooltip = ({ children, content, delay, side }: TooltipProps) => {
  return (
    <RadixTooltip.Root delayDuration={delay}>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          side={side}
          className={styles.tooltipContent}
          sideOffset={10}
        >
          {content}
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
};

export default Tooltip;
