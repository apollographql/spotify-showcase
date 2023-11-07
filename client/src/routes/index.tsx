import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { gql, TypedDocumentNode, useSuspenseQuery } from '@apollo/client';
import cx from 'classnames';
import PageTitle from '../components/PageTitle';
import PlaylistTile from '../components/PlaylistTile';
import TileGrid from '../components/TileGrid';
import useIsLoggedIn from '../hooks/useIsLoggedIn';
import { IndexRouteQuery, IndexRouteQueryVariables } from '../types/api';
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
`;

const containerStyles = 'bg-black-base p-[var(--main-content--padding)] flex-1';

const LoggedIn = () => {
  // Use startOfHour to prevent infinite loop with a brand new date each time
  // this component unsuspends
  const timestamp = startOfHour(new Date()).toISOString();

  const { data } = useSuspenseQuery(INDEX_ROUTE_QUERY, {
    variables: { timestamp },
  });

  return (
    <div className={containerStyles}>
      <PageTitle>Jump back in</PageTitle>
      <TileGrid gap="2.5rem 1rem" minTileWidth="200px">
        {/*
          TODO: Render a list of saved albums using the AlbumTile component
        */}
      </TileGrid>
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
          To use this app, you will need a Spotify account. This will allow the
          app to make calls to the Spotify API using this app&apos;s GraphQL
          API.
        </Paragraph>
        <Heading level={2}>Running this app locally</Heading>
        <Paragraph>
          If you would like to hook this up to your own application, you will
          first need a Spotify developer token. Once obtained, you will need to
          add these credentials to the app.
        </Paragraph>
        <Heading level={3}>Create a Spotify application</Heading>
        <OrderedList>
          <ListItem>
            <Paragraph>
              First, visit the{' '}
              <Anchor
                target="_blank"
                href="https://developer.spotify.com/dashboard"
                rel="noreferrer"
              >
                Spotify developer portal
              </Anchor>{' '}
              and, if necessary, log in. This requires a Spotify user account.
            </Paragraph>
          </ListItem>
          <ListItem>
            <Paragraph>
              Create and register a new application to generate credentials.
              Follow the{' '}
              <Anchor
                target="_blank"
                href="https://developer.spotify.com/documentation/general/guides/authorization/app-settings/"
                rel="noreferrer"
              >
                App settings guide
              </Anchor>{' '}
              to learn more. We recommend this Spotify app is unique to this
              demo app.
            </Paragraph>
          </ListItem>
          <ListItem>
            <Paragraph>
              In the &lsquo;Edit Settings&rsquo; dialogue, add this app&apos;s
              redirect URI for this app to allow this app to sign in to your
              Spotify account.
            </Paragraph>
            <CodeBlock>http://localhost:3000/oauth/finalize</CodeBlock>
          </ListItem>
        </OrderedList>
        <Heading level={3}>Configure this application</Heading>
        <OrderedList>
          <ListItem>
            <Paragraph>
              Copy your app&apos;s &lsquo;Client ID&rsquo; and set it as the{' '}
              <InlineCode>VITE_SPOTIFY_CLIENT_ID</InlineCode> environment
              variable in <InlineCode>client/.env.development.local</InlineCode>{' '}
              file. This file should look as follows:
            </Paragraph>
            <CodeBlock>VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id</CodeBlock>
          </ListItem>
          <ListItem>
            <Paragraph>
              Optionally configure a default country code. To change the default
              country code (<InlineCode>US</InlineCode>), add an environment
              variable named <InlineCode>DEFAULT_COUNTRY_CODE</InlineCode> to
              your <InlineCode>server/.env</InlineCode> file.
            </Paragraph>
            <CodeBlock>DEFAULT_COUNTRY_CODE=CA</CodeBlock>
            <BlockQuote>
              This is needed to fetch an artist&apos;s top tracks on the artist
              page without needing geolocation.
            </BlockQuote>
          </ListItem>
          <ListItem>
            <Paragraph>Restart the app.</Paragraph>
          </ListItem>
        </OrderedList>
        <Paragraph>
          You are ready to go! <Anchor href="/login">Log in</Anchor> to use the
          app.
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
  level: 1 | 2 | 3;
}

const Heading = ({ children, level }: HeadingProps) => {
  const className = 'mb-2';

  switch (level) {
    case 1:
      return <h1 className={className}>{children}</h1>;
    case 2:
      return <h2 className={className}>{children}</h2>;
    case 3:
      return <h3 className={className}>{children}</h3>;
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
