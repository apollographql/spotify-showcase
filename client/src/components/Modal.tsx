import { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';

interface ModalProps {
  children: ReactNode;
  open: boolean;
  onChange: (open: boolean) => void;
  title: string;
}

const Modal = ({ children, open, onChange, title }: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black-pure/70 fixed inset-0" />
        <Dialog.Content className="w-[524px] min-h-[384px] bg-surface text-white rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg flex flex-col">
          <header className="flex p-6 items-center">
            <Dialog.Title className="flex-1">{title}</Dialog.Title>
            <Dialog.Close asChild>
              <button
                aria-label="Close"
                className="rounded-full hover:bg-surface-active p-1 transition-colors text-offwhite"
              >
                <XIcon strokeWidth={1} />
              </button>
            </Dialog.Close>
          </header>
          <div className="p-6 pt-0 flex-1">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
