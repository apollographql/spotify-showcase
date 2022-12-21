import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Music } from 'lucide-react';
import {
  AlbumGroup,
  ArtistRouteQuery,
  ArtistRouteQueryVariables,
} from '../../types/api';
import CoverPhoto from '../../components/CoverPhoto';
import PlaceholderCoverPhoto from '../../components/PlaceholderCoverPhoto';
import Page from '../../components/Page';
import Duration from '../../components/Duration';
import MediaTile from '../../components/MediaTile';
import Skeleton from '../../components/Skeleton';
import Text from '../../components/Text';
import TileGrid from '../../components/TileGrid';
import styles from './artist.module.scss';
import Flex from '../../components/Flex';
import { albumType } from '../../utils/album';
import { capitalize } from '../../utils/string';
import { thumbnail } from '../../utils/image';

const ARTIST_ROUTE_QUERY = gql`
  query ArtistRouteQuery($artistId: ID!) {
    artist(id: $artistId) {
      id
      name
      albums {
        edges {
          albumGroup
          node {
            id
            name
            albumType
            totalTracks
            images {
              url
            }
          }
        }
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
`;

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
        style={{ backgroundImage: `url(${image.url})` }}
      >
        <Page.Title>{artist.name}</Page.Title>
        <Text>
          {new Intl.NumberFormat().format(artist.followers.total)} followers
        </Text>
      </header>
      <Page.Content>
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
                  <CoverPhoto
                    src={albumCoverPhoto.url}
                    fallback={<PlaceholderCoverPhoto icon={Music} />}
                    size="2.5rem"
                  />
                  {track.name}
                </Flex>
                <Text color="muted">
                  <Duration durationMs={track.durationMs} />
                </Text>
              </div>
            );
          })}
        </div>

        <h2>Albums</h2>
        <TileGrid gap="1rem" minTileWidth="200px">
          {artist.albums?.edges
            .filter((edge) => edge.albumGroup === AlbumGroup.Album)
            .map(({ node }) => (
              <MediaTile
                coverPhotoSrc={node.images[0].url}
                description="Album"
                title={node.name}
                to={`/albums/${node.id}`}
              />
            ))}
        </TileGrid>
        <h2>Singles and EPs</h2>
        <TileGrid gap="1rem" minTileWidth="200px">
          {artist.albums?.edges
            .filter((edge) => edge.albumGroup === AlbumGroup.Single)
            .map(({ node }) => (
              <MediaTile
                coverPhotoSrc={node.images[0].url}
                description={capitalize(albumType(node))}
                title={node.name}
                to={`/albums/${node.id}`}
              />
            ))}
        </TileGrid>
        <h2>Featuring {artist.name}</h2>
        <TileGrid gap="1rem" minTileWidth="200px">
          {artist.albums?.edges
            .filter((edge) => edge.albumGroup === AlbumGroup.AppearsOn)
            .map(({ node }) => (
              <MediaTile
                coverPhotoSrc={node.images[0].url}
                description="Single"
                title={node.name}
                to={`/albums/${node.id}`}
              />
            ))}
        </TileGrid>
      </Page.Content>
    </Page>
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
