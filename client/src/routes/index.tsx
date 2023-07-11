import { ComponentPropsWithoutRef, ReactNode, Suspense } from 'react';
import {
  gql,
  useBackgroundQuery,
  useReadQuery,
  TypedDocumentNode,
} from '@apollo/client';
import { QueryReference } from '@apollo/client/react/cache/QueryReference';
import cx from 'classnames';
import PageTitle from '../components/PageTitle';
import PlaylistTile from '../components/PlaylistTile';
import TileGrid from '../components/TileGrid';
import useIsLoggedIn from '../hooks/useIsLoggedIn';
import { IndexRouteQuery, IndexRouteQueryVariables } from '../types/api';
import { DEFAULT_BACKGROUND_COLOR } from '../constants';
import useSetBackgroundColor from '../hooks/useSetBackgroundColor';
import { startOfHour } from 'date-fns';
import Flex from '../components/Flex';
import Skeleton from '../components/Skeleton';

export const RouteComponent = () => {
  const isLoggedIn = useIsLoggedIn();

  return isLoggedIn ? <LoggedIn /> : <LoggedOut />;
};

const INDEX_ROUTE_QUERY: TypedDocumentNode<
  IndexRouteQuery,
  IndexRouteQueryVariables
> = gql`
  query IndexRouteQuery($timestamp: DateTime) {
    featuredPlaylists(timestamp: $timestamp) {
      message
      edges {
        node {
          id
          ...PlaylistTile_playlist
        }
      }
    }
  }

  ${PlaylistTile.fragments.playlist}
`;

const containerStyles = 'bg-black-base p-[var(--main-content--padding)] flex-1';

const LoggedIn = () => {
  useSetBackgroundColor('#1A101C');
  // Use startOfHour to prevent infinite loop with a brand new date each time
  // this component unsuspends
  const timestamp = startOfHour(new Date()).toISOString();

  const [queryRef] = useBackgroundQuery(INDEX_ROUTE_QUERY, {
    variables: { timestamp },
  });

  return (
    <Suspense fallback={<LoadingState />}>
      <PlaylistTileGrid queryRef={queryRef as QueryReference<IndexRouteQuery>} />
    </Suspense>
  );
};

const PlaylistTileGrid = ({
  queryRef,
}: {
  queryRef: QueryReference<IndexRouteQuery>;
}) => {
  const { data } = useReadQuery(queryRef);
  return (
    <div className={containerStyles}>
      <PageTitle>{data.featuredPlaylists?.message}</PageTitle>
      <TileGrid gap="2.5rem 1rem" minTileWidth="200px">
        {data.featuredPlaylists?.edges.map(({ node }) => (
          <PlaylistTile key={node.id} playlist={node} />
        ))}
      </TileGrid>
    </div>
  );
};

const LoggedOut = () => {
  useSetBackgroundColor(DEFAULT_BACKGROUND_COLOR);

  return (
    <div className={cx(containerStyles)}>
      <div className="flex flex-col max-w-3xl my-0 mx-auto">
        <Heading level={1}>Welcome to the Apollo Showcase demo</Heading>
        <Paragraph>
          This demo app provides a playground to test and learn about various
          Apollo features to understand how Apollo can be used in a moderately
          complex app.
        </Paragraph>
        <Heading level={2}>Getting started</Heading>
        <Paragraph>
          To use this demo app, you will need a Spotify account.
          This will allow the app to make calls to the Spotify API using this
          app&apos;s GraphQL API.  
        </Paragraph>
        <Paragraph>
          If you would like to hook this up to your own application, create a new  application in the [Spotify developer portal](https://developer.spotify.com/dashboard). 
          You will need to replace the `VITE_SPOTIFY_CLIENT_ID` in the `.env` file at the root of the project with the one you create.
        </Paragraph>
      </div>
    </div>
  );
};

interface CodeBlockProps {
  children: ReactNode;
}

const CodeBlock = ({ children }: CodeBlockProps) => {
  return (
    <pre className="block">
      <code className="bg-code block rounded whitespace-pre-wrap p-2">
        {children}
      </code>
    </pre>
  );
};

interface InlineCodeProps {
  children: ReactNode;
}

const InlineCode = ({ children }: InlineCodeProps) => {
  return (
    <code className="bg-code rounded-sm py-[0.125rem] px-1 text-[85%]">
      {children}
    </code>
  );
};

interface OrderedListProps {
  children: ReactNode;
}

const OrderedList = ({ children }: OrderedListProps) => {
  return <ol className="mb-8 last:mb-0">{children}</ol>;
};

interface BlockQuoteProps {
  children: ReactNode;
}

const BlockQuote = ({ children }: BlockQuoteProps) => {
  return (
    <blockquote className="py-2 px-0 text-muted text-sm">{children}</blockquote>
  );
};

interface ParagraphProps {
  children: ReactNode;
}

const Paragraph = ({ children }: ParagraphProps) => {
  return <p className="text-xl mb-8 last:mb-0">{children}</p>;
};

interface ListItemProps {
  children: ReactNode;
}

const ListItem = ({ children }: ListItemProps) => {
  return <li className="mb-2 last:mb-0 [&>p]:mb-4">{children}</li>;
};

interface HeadingProps {
  children: ReactNode;
  level: 1 | 2;
}

const Heading = ({ children, level }: HeadingProps) => {
  const className = 'mb-2';

  switch (level) {
    case 1:
      return <h1 className={className}>{children}</h1>;
    case 2:
      return <h2 className={className}>{children}</h2>;
  }
};

type AnchorProps = Omit<ComponentPropsWithoutRef<'a'>, 'className'>;

const Anchor = ({ children, ...props }: AnchorProps) => {
  return (
    <a {...props} className="text-theme-light underline">
      {children}
    </a>
  );
};

export const LoadingState = () => {
  return (
    <Flex className={containerStyles} direction="column" gap="2rem">
      <Skeleton.Heading level={1} width="20%" />
      <Skeleton.CoverPhoto size="120px" />
    </Flex>
  );
};
