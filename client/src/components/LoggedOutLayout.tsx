import { Outlet } from 'react-router-dom';
import Layout from './Layout';
import { Library } from 'lucide-react';
import Button from './Button';

const LoggedOutLayout = () => {
  return (
    <>
      <div
        onContextMenu={(e) => e.preventDefault()}
        className={
          'grid gap-2 p-2 h-screen grid-cols-[375px_1fr] [grid-template-areas:"sidebar_main-view"]'
        }
      >
        <Layout.Sidebar>
          <Layout.Sidebar.Section className="flex-1 overflow-hidden flex flex-col">
            <header className="px-4 py-2">
              <h2 className="text-muted flex gap-2 items-center py-2 text-base">
                <Library /> Your Library
              </h2>
            </header>
            <div className="bg-surface rounded-md px-3 py-4 mx-2">
              <h3 className="font-semibold">Developing with Apollo</h3>
              <p className="mt-2">
                This showcase demonstrates some of the capabilities and best
                practices of developing with Apollo. Log in and we&apos;ll show
                you how developing with Apollo is an amazing experience.
              </p>
              <Button
                as="a"
                href="/login"
                variant="secondary"
                size="sm"
                className="mt-6"
              >
                Log in
              </Button>
            </div>
          </Layout.Sidebar.Section>
        </Layout.Sidebar>
        <Layout.Main>
          <Layout.Header />
          <Outlet />
        </Layout.Main>
      </div>
    </>
  );
};

export default LoggedOutLayout;
