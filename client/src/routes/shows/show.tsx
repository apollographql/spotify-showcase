import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import cx from 'classnames';
import { useParams } from 'react-router-dom';
import {
  ShowRouteQuery,
  ShowRouteQueryVariables,
  ShowRoute_playbackState as PlaybackState,
} from '../../types/api';
import useSetBackgroundColorFromImage from '../../hooks/useSetBackgroundColorFromImage';
import CoverPhoto from '../../components/CoverPhoto';
import DelimitedList from '../../components/DelimitedList';
import EntityLink from '../../components/EntityLink';
import EpisodeReleaseDate from '../../components/EpisodeReleaseDate';
import EpisodeRemainingDuration from '../../components/EpisodeRemainingDuration';
import Flex from '../../components/Flex';
import Page from '../../components/Page';
import Text from '../../components/Text';
import styles from './show.module.scss';
import PlayButton from '../../components/PlayButton';
import usePlaybackState from '../../hooks/usePlaybackState';

const SHOW_ROUTE_QUERY = gql`
  query ShowRouteQuery($showId: ID!) {
    show(id: $showId) {
      id
      description(format: HTML)
      name
      publisher
      episodes {
        edges {
          node {
            id
            name
            durationMs
            uri
            releaseDate {
              date
              precision
            }

            ...EpisodeRemainingDuration_episode
          }
        }
      }
      images {
        url
      }
    }
  }

  ${EpisodeRemainingDuration.fragments.episode}
`;

const PLAYBACK_STATE_FRAGMENT = gql`
  fragment ShowRoute_playbackState on PlaybackState {
    isPlaying
    item {
      __typename
      id
      uri
    }
  }
`;

export const RouteComponent = () => {
  const { showId } = useParams() as { showId: string };
  const { data } = useSuspenseQuery<ShowRouteQuery, ShowRouteQueryVariables>(
    SHOW_ROUTE_QUERY,
    { variables: { showId } }
  );

  const show = data.show;

  if (!show) {
    throw new Error('Show not found');
  }

  const playbackState = usePlaybackState<PlaybackState>({
    fragment: PLAYBACK_STATE_FRAGMENT,
  });
  const isPlaying = playbackState?.isPlaying ?? false;
  const coverPhoto = show.images[0];
  const upNext = show.episodes?.edges[0].node;

  useSetBackgroundColorFromImage(coverPhoto, {
    fallback: 'rgba(var(--background--surface--rgb), 0.5)',
  });

  return (
    <Page>
      <Page.Header
        mediaType="podcast"
        coverPhoto={<CoverPhoto image={coverPhoto} />}
        title={show.name}
        details={[<span key="publisher">{show.publisher}</span>]}
      />
      <Page.Content>
        <section className={styles.mainSection}>
          <Flex direction="column" gap="1rem">
            {upNext && (
              <div className={styles.upNext}>
                <div>
                  <Text color="muted" size="sm">
                    Up next
                  </Text>
                </div>
                <Flex direction="column" gap="1rem">
                  <EntityLink className={styles.episodeName} entity={upNext}>
                    {upNext.name}
                  </EntityLink>
                  <DelimitedList
                    as={Text}
                    delimiter=" · "
                    color="muted"
                    size="sm"
                  >
                    <EpisodeReleaseDate releaseDate={upNext.releaseDate} />
                    <EpisodeRemainingDuration episode={upNext} />
                  </DelimitedList>
                </Flex>
              </div>
            )}

            <h2>All episodes</h2>
            <ul className={styles.episodeList}>
              {show.episodes?.edges.map(({ node }) => {
                const isCurrentEpisode = node.uri === playbackState?.item?.uri;

                return (
                  <li key={node.id} className={styles.episode}>
                    <CoverPhoto image={coverPhoto} size="100px" />
                    <Flex direction="column" justifyContent="space-between">
                      <EntityLink
                        className={cx(styles.episodeName, {
                          [styles.isCurrent]: isCurrentEpisode,
                        })}
                        entity={node}
                      >
                        {node.name}
                      </EntityLink>
                      <Flex gap="1rem" alignItems="center">
                        <PlayButton
                          size="2rem"
                          playing={isPlaying && isCurrentEpisode}
                        />
                        <DelimitedList
                          as={Text}
                          delimiter=" · "
                          color="muted"
                          size="sm"
                        >
                          <EpisodeReleaseDate releaseDate={node.releaseDate} />
                          <EpisodeRemainingDuration episode={node} />
                        </DelimitedList>
                      </Flex>
                    </Flex>
                  </li>
                );
              })}
            </ul>
          </Flex>
          <Flex direction="column" gap="1rem">
            <h2>About</h2>
            <Text
              as="p"
              color="muted"
              dangerouslySetInnerHTML={{ __html: show.description }}
            />
          </Flex>
        </section>
      </Page.Content>
    </Page>
  );
};

export const LoadingState = () => {
  return (
    <Page>
      <Page.SkeletonHeader />
    </Page>
  );
};
