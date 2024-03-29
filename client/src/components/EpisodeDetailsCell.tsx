import { gql } from '@apollo/client';
import { EpisodeDetailsCell_episode as Episode } from '../types/api';
import { thumbnail } from '../utils/image';
import CoverPhoto from './CoverPhoto';
import EntityLink from './EntityLink';
import ExplicitBadge from './ExplicitBadge';
import { fragmentRegistry } from '../apollo/fragmentRegistry';

interface EpisodeDetailsCellProps {
  episode: Episode;
}

fragmentRegistry.register(gql`
  fragment EpisodeDetailsCell_episode on Episode {
    id
    explicit
    name
    show {
      id
      publisher
      images {
        url
      }
    }
  }
`);

const EpisodeDetailsCell = ({ episode }: EpisodeDetailsCellProps) => {
  return (
    <div className="flex gap-2">
      <CoverPhoto image={thumbnail(episode.show.images)} size="2.5rem" />
      <div className="flex flex-col">
        <span className="text-base">{episode.name}</span>
        <div className="flex gap-2 items-center">
          {episode.explicit && <ExplicitBadge />}
          <EntityLink entity={episode.show} className="text-muted">
            {episode.show.publisher}
          </EntityLink>
        </div>
      </div>
    </div>
  );
};

export default EpisodeDetailsCell;
