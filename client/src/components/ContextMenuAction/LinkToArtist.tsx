import ContextMenu from '../ContextMenu';
import { getEntityPathname } from '../../utils/navigation';

interface Artist {
  __typename: 'Artist';
  id: string;
  name: string;
}

interface LinkToArtistProps {
  artists: Artist[];
}

const LinkToArtist = ({ artists }: LinkToArtistProps) => {
  if (artists.length > 1) {
    return (
      <ContextMenu.SubMenu
        content={artists.map((artist) => {
          return (
            <ContextMenu.Link key={artist.id} to={getEntityPathname(artist)}>
              {artist.name}
            </ContextMenu.Link>
          );
        })}
      >
        Go to artist
      </ContextMenu.SubMenu>
    );
  }

  return (
    <ContextMenu.Link to={getEntityPathname(artists[0])}>
      Go to artist
    </ContextMenu.Link>
  );
};

export default LinkToArtist;
