import { gql } from '@apollo/client';
import cx from 'classnames';
import { YourEpisodesTile_connection as Connection } from '../types/api';
import DelimitedList from './DelimitedList';
import { fragmentRegistry } from '../apollo/fragmentRegistry';

interface YourEpisodesTileProps {
  className?: string;
  connection: Connection;
}

fragmentRegistry.register(gql`
  fragment YourEpisodesTile_connection on SavedEpisodesConnection {
    pageInfo {
      total
    }
    edges {
      node {
        id
        name
        show {
          id
          name
        }
      }
    }
  }
`);

const YourEpisodesTile = ({ className, connection }: YourEpisodesTileProps) => {
  const { pageInfo, edges } = connection;

  return (
    <div
      className={cx(
        className,
        'p-4 bg-[linear-gradient(.316turn,#00644e_50.57%,#27856a)] hover:no-underline rounded flex relative group overflow-hidden'
      )}
    >
      <div className="flex flex-col gap-6 flex-1">
        <div className="flex-1 flex flex-col justify-center">
          <DelimitedList className="line-clamp-3 break-words" delimiter=" · ">
            {edges.map(({ node }) => (
              <span key={node.id}>
                {node.name} <span className="opacity-70">{node.show.name}</span>
              </span>
            ))}
          </DelimitedList>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-4xl font-bold font-title">Your Episodes</div>
          <div className="text-sm">
            {new Intl.NumberFormat().format(pageInfo.total)} episodes
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourEpisodesTile;
