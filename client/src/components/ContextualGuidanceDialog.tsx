import { ReactElement } from 'react-markdown/lib/react-markdown';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import Button from './Button';
import Tabs from './Tabs';
import { MDXContent } from 'mdx/types';
import mdxComponents from './mdx';

interface MDXDocument {
  frontmatter: Record<string, unknown>;
  default: MDXContent;
}

interface ContextualGuidanceDialogProps {
  children: ReactElement;
  documents: MDXDocument[];
}

const ContextualGuidanceDialog = ({
  documents,
  children,
}: ContextualGuidanceDialogProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-surface/50 animate-fade-in fixed inset-0 [--animate-duration:200ms]" />
        <Dialog.Content className="bg-surface-lowContrast animate-slide-left-fade fixed inset-3 left-1/3 rounded p-4 text-base shadow-2xl outline-0 [--animate-slide-distance:30px]">
          <Dialog.Close asChild>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-2 !p-0"
            >
              <X size="1.5rem" />
            </Button>
          </Dialog.Close>
          <Tabs
            tabs={documents.map((document) => ({
              id: document.frontmatter.tab as string,
              name: document.frontmatter.tab as string,
            }))}
          >
            {documents.map((document) => (
              <Tabs.Content
                className="markdown"
                key={document.frontmatter.tab as string}
                id={document.frontmatter.tab as string}
              >
                <document.default components={mdxComponents} />
              </Tabs.Content>
            ))}
          </Tabs>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ContextualGuidanceDialog;
