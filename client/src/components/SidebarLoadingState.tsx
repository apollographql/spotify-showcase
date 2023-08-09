import { range } from 'lodash';
import { Library } from 'lucide-react';
import { randomBetween } from '../utils/common';
import { withHighlight } from './LoadingStateHighlighter';
import Skeleton from './Skeleton';
import Layout from './Layout';

export const SidebarLoadingState = withHighlight(
  () => {
    const skeletons = range(0, randomBetween(10, 15));

    return (
      <Layout.Sidebar>
        <Layout.Sidebar.Section className="flex-1 overflow-hidden flex flex-col pb-0">
          <header className="px-4 py-2">
            <h2 className="text-muted flex gap-2 items-center py-2 text-base">
              <Library /> Your Library
            </h2>
          </header>
          <div className="overflow-y-auto flex-1 -mx-1 px-3">
            {skeletons.map((num) => (
              <li key={num} className="px-0 py-2">
                <div className="flex gap-2">
                  <Skeleton.CoverPhoto size="3rem" />
                  <div className="flex flex-col gap-4 flex-1">
                    <Skeleton.Text
                      width={`${randomBetween(40, 60)}%`}
                      fontSize="1rem"
                    />
                    <Skeleton.Text
                      width={`${randomBetween(50, 70)}%`}
                      fontSize="0.75rem"
                    />
                  </div>
                </div>
              </li>
            ))}
          </div>
        </Layout.Sidebar.Section>
      </Layout.Sidebar>
    );
  },
  { shade: '#FF40FF' }
);
