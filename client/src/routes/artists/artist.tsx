import { gql, useSuspenseQuery } from '@apollo/client';
import cx from 'classnames';
import { useParams } from 'react-router-dom';
import { Get } from 'type-fest';
import { ArtistRouteQuery, ArtistRouteQueryVariables } from '../../types/api';
import AlbumTile from '../../components/AlbumTile';
import ArtistTile from '../../components/ArtistTile';
import ArtistTopTracks from '../../components/ArtistTopTracks';
import Page from '../../components/Page';
import Skeleton from '../../components/Skeleton';
import TileGrid from '../../components/TileGrid';

type Album = NonNullable<Get<ArtistRouteQuery, 'artist.albums.edges[0].node'>>;

const ARTIST_ROUTE_QUERY = gql`
  query ArtistRouteQuery($artistId: ID!) {
    artist(id: $artistId) {
      id
      name
      albums(includeGroups: [ALBUM]) {
        ...ArtistRouteQuery_albums
      }

      singles: albums(includeGroups: [SINGLE]) {
        ...ArtistRouteQuery_albums
      }

      appearsOn: albums(includeGroups: [APPEARS_ON]) {
        ...ArtistRouteQuery_albums
      }

      followers {
        total
      }
      images {
        url
      }
      relatedArtists {
        id
        ...ArtistTile_artist
      }
      topTracks {
        id

        ...ArtistTopTracks_tracks
      }
    }
  }

  fragment ArtistRouteQuery_albums on ArtistAlbumsConnection {
    edges {
      node {
        id
        name
        totalTracks
        images {
          url
        }
      }
    }
  }
`;

const getAlbums = (albumConnection: Get<ArtistRouteQuery, 'artist.albums'>) => {
  if (!albumConnection) {
    return [];
  }

  return (albumConnection.edges ?? []).map((edge) => edge.node);
};

const classNames = {
  header: cx(
    'flex flex-col items-start gap-4 justify-end h-[40vh] p-[var(--main-content--padding)] pt-[var(--main-header--height)] mt-[calc(-1*var(--main-header--height))] bg-cover [background-position:50%_15%] bg-no-repeat relative [&>*]:z-[1]',
    'before:absolute before:inset-0 before:[background:linear-gradient(rgba(0,0,0,0)_-30%,#181818)]'
  ),
  section: 'flex flex-col gap-2',
};

export const RouteComponent = () => {
  const { artistId } = useParams() as { artistId: string };

  const { data } = useSuspenseQuery<
    ArtistRouteQuery,
    ArtistRouteQueryVariables
  >(ARTIST_ROUTE_QUERY, {
    variables: { artistId },
  });

  const artist = data.artist;

  if (!artist) {
    throw new Error('Artist not found');
  }

  const image = artist.images[0];

  return (
    <Page>
      <header
        className={classNames.header}
        style={{ backgroundImage: image && `url(${image.url})` }}
      >
        <Page.Title>{artist.name}</Page.Title>
        <span>
          {new Intl.NumberFormat().format(artist.followers.total)} followers
        </span>
      </header>
      <Page.Content gap="2rem">
        <section className={classNames.section}>
          <h2>Popular</h2>
          <ArtistTopTracks className="max-w-[60%]" tracks={artist.topTracks} />
        </section>

        <AlbumSection title="Albums" albums={getAlbums(artist.albums)} />
        <AlbumSection
          title="Singles and EPs"
          albums={getAlbums(artist.singles)}
        />
        <AlbumSection title="Appears On" albums={getAlbums(artist.appearsOn)} />

        <section className={classNames.section}>
          <h2>Fans also like</h2>
          <TileGrid gap="1rem" minTileWidth="200px">
            {artist.relatedArtists.map((relatedArtist) => (
              <ArtistTile key={relatedArtist.id} artist={relatedArtist} />
            ))}
          </TileGrid>
        </section>
      </Page.Content>
    </Page>
  );
};

interface AlbumSectionProps {
  albums: Album[];
  title: string;
}

const AlbumSection = ({ albums, title }: AlbumSectionProps) => {
  if (albums.length === 0) {
    return null;
  }

  return (
    <section className={classNames.section}>
      <h2>{title}</h2>
      <TileGrid gap="1rem" minTileWidth="200px">
        {albums.map((album) => (
          <AlbumTile key={album.id} album={album} />
        ))}
      </TileGrid>
    </section>
  );
};

export const LoadingState = () => (
  <Page>
    <header className={classNames.header}>
      <Skeleton.Heading level={1} width="65%" />
      <Skeleton.Text width="45%" />
    </header>
  </Page>
);
