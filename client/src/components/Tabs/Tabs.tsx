import { ReactNode } from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';

import Content from './Content';

interface TabConfig {
  id: string;
  name: string;
}

interface TabsProps {
  children?: ReactNode;
  tabs: TabConfig[];
}

const Tabs = ({ children, tabs }: TabsProps) => {
  return (
    <RadixTabs.Root
      defaultValue={tabs[0].id}
      className="flex h-full flex-col gap-8"
    >
      <RadixTabs.List className="flex gap-2">
        {tabs.map((tab) => (
          <RadixTabs.Trigger
            key={tab.id}
            value={tab.id}
            className="data-active:bg-surface-active rounded px-4 py-3 text-sm font-bold"
          >
            {tab.name}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {children}
    </RadixTabs.Root>
  );
};

Tabs.Content = Content;

export default Tabs;
