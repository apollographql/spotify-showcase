import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Get } from 'type-fest';
import { ArtistRouteQuery, ArtistRouteQueryVariables } from '../../types/api';
import AlbumTile from '../../components/AlbumTile';
import CoverPhoto from '../../components/CoverPhoto';
import Page from '../../components/Page';
import Duration from '../../components/Duration';
import Skeleton from '../../components/Skeleton';
import Text from '../../components/Text';
import TileGrid from '../../components/TileGrid';
import styles from './artist.module.scss';
import Flex from '../../components/Flex';
import { thumbnail } from '../../utils/image';

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
      topTracks {
        id
        name
        durationMs
        album {
          id
          images {
            url
          }
        }
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

  const artist = data.artist!;
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
      <Page.Content>
        <section className={styles.section}>
          <h2>Popular</h2>
          <div className={styles.topTracks}>
            {artist.topTracks.slice(0, 5).map((track, index) => {
              const albumCoverPhoto = thumbnail(track.album.images);

              return (
                <div key={track.id} className={styles.topTracks__track}>
                  <Text className={styles.topTrack__number} color="muted">
                    {index + 1}
                  </Text>
                  <Flex alignItems="center" gap="1rem">
                    <CoverPhoto image={albumCoverPhoto} size="2.5rem" />
                    {track.name}
                  </Flex>
                  <Text color="muted">
                    <Duration durationMs={track.durationMs} />
                  </Text>
                </div>
              );
            })}
          </div>
        </section>

        <AlbumSection title="Albums" albums={getAlbums(artist.albums)} />
        <AlbumSection
          title="Singles and EPs"
          albums={getAlbums(artist.singles)}
        />
        <AlbumSection title="Appears On" albums={getAlbums(artist.appearsOn)} />
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
          <AlbumTile album={album} />
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
