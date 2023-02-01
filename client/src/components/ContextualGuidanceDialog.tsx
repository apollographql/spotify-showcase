import { ReactElement } from 'react-markdown/lib/react-markdown';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import Button from './Button';

interface ContextualGuidanceDialogProps {
  children: ReactElement;
  content: ReactElement;
}

const ContextualGuidanceDialog = ({
  content,
  children,
}: ContextualGuidanceDialogProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-surface/50 animate-fade-in fixed inset-0 [--animate-duration:200ms]" />
        <Dialog.Content className="bg-surface animate-slide-left-fade fixed inset-3 left-1/3 rounded p-4 text-base shadow-2xl outline-0 [--animate-slide-distance:30px]">
          <Dialog.Close asChild>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-2 !p-0"
            >
              <X size="1.5rem" />
            </Button>
          </Dialog.Close>
          <div className="markdown">{content}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ContextualGuidanceDialog;
