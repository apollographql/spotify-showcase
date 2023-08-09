import { ReactNode } from 'react';
import Layout from './Layout';

interface SidebarSectionProps {
  children: ReactNode;
}

const SidebarSection = ({ children }: SidebarSectionProps) => {
  return (
    <Layout.Sidebar.Section className="flex-1 overflow-hidden flex flex-col pb-0">
      {children}
    </Layout.Sidebar.Section>
  );
};

export default SidebarSection;
