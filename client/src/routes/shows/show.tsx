import { gql, useSuspenseQuery } from '@apollo/client';
import cx from 'classnames';
import { useParams } from 'react-router-dom';
import {
  ShowRouteQuery,
  ShowRouteQueryVariables,
  ShowRoute_playbackState as PlaybackState,
} from '../../types/api';
import CoverPhoto from '../../components/CoverPhoto';
import DelimitedList from '../../components/DelimitedList';
import EntityLink from '../../components/EntityLink';
import EpisodeReleaseDate from '../../components/EpisodeReleaseDate';
import EpisodeRemainingDuration from '../../components/EpisodeRemainingDuration';
import Flex from '../../components/Flex';
import Page from '../../components/Page';
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
            ...EpisodeRemainingDuration_episode @unmask(mode: "migrate")
          }
        }
      }
      images {
        url
        vibrantColor(format: RGB, alpha: 0.9) @client
      }
    }
  }
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

  return (
    <Page bgColor={coverPhoto.vibrantColor}>
      <Page.Header
        mediaType="podcast"
        coverPhoto={<CoverPhoto image={coverPhoto} />}
        title={show.name}
        details={[<span key="publisher">{show.publisher}</span>]}
      />
      <Page.Content>
        <section className="grid grid-cols-[2fr_1fr] gap-8 max-w-[1600px] whitespace-pre-wrap">
          <Flex direction="column" gap="1rem">
            {upNext && (
              <div className="p-4 rounded bg-surface bg-opacity-50">
                <div>
                  <span className="text-muted text-sm">Up next</span>
                </div>
                <Flex direction="column" gap="1rem">
                  <EntityLink className="font-bold" entity={upNext}>
                    {upNext.name}
                  </EntityLink>
                  <DelimitedList delimiter=" · " className="text-muted text-sm">
                    <EpisodeReleaseDate releaseDate={upNext.releaseDate} />
                    <EpisodeRemainingDuration episode={upNext} />
                  </DelimitedList>
                </Flex>
              </div>
            )}

            <h2>All episodes</h2>
            <ul className="list-none m-0 p-0 rounded overflow-hidden">
              {show.episodes?.edges.map(({ node }) => {
                const isCurrentEpisode = node.uri === playbackState?.item?.uri;

                return (
                  <li
                    key={node.id}
                    className="flex gap-4 p-4 bg-surface-low-contrast bg-opacity-75 transition-colors ease-out duration-150 hover:bg-surface-low-contrast-hover border-b border-solid border-primary last:border-b-0"
                  >
                    <CoverPhoto image={coverPhoto} size="100px" />
                    <Flex direction="column" justifyContent="space-between">
                      <EntityLink
                        className={cx('font-bold', {
                          'text-theme': isCurrentEpisode,
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
                          delimiter=" · "
                          className="text-muted text-sm"
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
            <p
              className="text-muted"
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
