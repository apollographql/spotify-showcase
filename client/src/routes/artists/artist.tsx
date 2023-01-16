import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Get } from 'type-fest';
import { ArtistRouteQuery, ArtistRouteQueryVariables } from '../../types/api';
import AlbumTile from '../../components/AlbumTile';
import ArtistTile from '../../components/ArtistTile';
import ArtistTopTracks from '../../components/ArtistTopTracks';
import Page from '../../components/Page';
import Skeleton from '../../components/Skeleton';
import Text from '../../components/Text';
import TileGrid from '../../components/TileGrid';
import styles from './artist.module.scss';

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

        ...AlbumTile_album
      }
    }
  }

  ${AlbumTile.fragments.album}
  ${ArtistTile.fragments.artist}
  ${ArtistTopTracks.fragments.tracks}
`;

const getAlbums = (albumConnection: Get<ArtistRouteQuery, 'artist.albums'>) => {
  if (!albumConnection) {
    return [];
  }

  return albumConnection.edges.map((edge) => edge.node);
};

const ArtistRoute = () => {
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
        className={styles.header}
        style={{ backgroundImage: image && `url(${image.url})` }}
      >
        <Page.Title>{artist.name}</Page.Title>
        <Text>
          {new Intl.NumberFormat().format(artist.followers.total)} followers
        </Text>
      </header>
      <Page.Content gap="2rem">
        <section className={styles.section}>
          <h2>Popular</h2>
          <ArtistTopTracks
            className={styles.topTracks}
            tracks={artist.topTracks}
          />
        </section>

        <AlbumSection title="Albums" albums={getAlbums(artist.albums)} />
        <AlbumSection
          title="Singles and EPs"
          albums={getAlbums(artist.singles)}
        />
        <AlbumSection title="Appears On" albums={getAlbums(artist.appearsOn)} />

        <section className={styles.section}>
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
    <section className={styles.section}>
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
    <header className={styles.header}>
      <Skeleton.Heading level={1} width="65%" />
      <Skeleton.Text width="45%" />
    </header>
  </Page>
);

export default ArtistRoute;
