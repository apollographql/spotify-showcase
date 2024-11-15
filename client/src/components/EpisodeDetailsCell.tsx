import {
  FragmentType,
  TypedDocumentNode,
  gql,
  useFragment,
} from '@apollo/client';
import { EpisodeDetailsCell_episode } from '../types/api';
import { thumbnail } from '../utils/image';
import CoverPhoto from './CoverPhoto';
import EntityLink from './EntityLink';
import ExplicitBadge from './ExplicitBadge';
import { fragmentRegistry } from '../apollo/fragmentRegistry';

interface EpisodeDetailsCellProps {
  episode: FragmentType<EpisodeDetailsCell_episode>;
}

const EpisodeDetailsCellFragment: TypedDocumentNode<EpisodeDetailsCell_episode> = gql`
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
`;

fragmentRegistry.register(EpisodeDetailsCellFragment);

const EpisodeDetailsCell = ({ episode }: EpisodeDetailsCellProps) => {
  const { data, complete } = useFragment({
    fragment: EpisodeDetailsCellFragment,
    from: episode,
  });

  if (!complete) {
    return null;
  }

  return (
    <div className="flex gap-2">
      <CoverPhoto image={thumbnail(data.show.images)} size="2.5rem" />
      <div className="flex flex-col">
        <span className="text-base">{data.name}</span>
        <div className="flex gap-2 items-center">
          {data.explicit && <ExplicitBadge />}
          <EntityLink entity={data.show} className="text-muted">
            {data.show.publisher}
          </EntityLink>
        </div>
      </div>
    </div>
  );
};

export default EpisodeDetailsCell;
