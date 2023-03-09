import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import cx from 'classnames';
import PageTitle from '../components/PageTitle';
import PlaylistTile from '../components/PlaylistTile';
import TileGrid from '../components/TileGrid';
import useIsLoggedIn from '../hooks/useIsLoggedIn';
import styles from './index.module.scss';
import { IndexRouteQuery, IndexRouteQueryVariables } from '../types/api';
import { DEFAULT_BACKGROUND_COLOR } from '../constants';
import useSetBackgroundColor from '../hooks/useSetBackgroundColor';
import { startOfHour } from 'date-fns';
import Flex from '../components/Flex';
import Skeleton from '../components/Skeleton';
import { useEffect, useState } from 'react';
import Cookie from 'js-cookie';

export const RouteComponent = () => {
  const isLoggedIn = useIsLoggedIn();

  return isLoggedIn ? <LoggedIn /> : <LoggedOut />;
};

const INDEX_ROUTE_QUERY = gql`
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

const LoggedIn = () => {
  useSetBackgroundColor('#1A101C');

  // Use startOfHour to prevent infinite loop with a brand new date each time
  // this component unsuspends
  const timestamp = startOfHour(new Date()).toISOString();

  const { data } = useSuspenseQuery<IndexRouteQuery, IndexRouteQueryVariables>(
    INDEX_ROUTE_QUERY,
    { variables: { timestamp } }
  );

  return (
    <div className={styles.container}>
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
    <div className={cx(styles.container, styles.instructions)}>
      <h1>Welcome to the Apollo Spotify demo</h1>
      <p>
        This demo app provides a playground to test and learn about various
        Apollo features to understand how Apollo can be used in a moderately
        complex app.
      </p>
      <p>
        <strong>NOTE:</strong> For security and simplicity, the backend does not
        store the OAuth refresh token upon logging in. This means your logged in
        session will expire when the access token expires (~1 hr).
      </p>
      <h2>Getting started</h2>
      <p>
        To use this demo app, you will first need a Spotify developer token.
        This will allow the app to make calls to the Spotify API using this
        app&apos;s GraphQL API. Once obtained, you will need to add these
        credentials to the app.
      </p>
      <h2>Register a Spotify application</h2>
      <ol>
        <li>
          <p>
            Visit the{' '}
            <a href="https://developer.spotify.com/dashboard">Dashboard</a> page
            on the Spotify website and, if necessary, log in. This requires a
            Spotify user account.
          </p>
        </li>
        <li>
          <p>
            Create and register a new application to generate credentials.
            Follow the{' '}
            <a href="https://developer.spotify.com/documentation/general/guides/authorization/app-settings/">
              App settings guide
            </a>{' '}
            to learn more. We recommend this Spotify app is unique to this demo
            app.
          </p>
        </li>
        <li>
          <p>
            In the &lsquo;Edit Settings&rsquo; dialogue, add this app&apos;s
            redirect URI for this app to allow this app to sign in to your
            Spotify account.
          </p>
          <p>
            <code>{window.location.origin}/oauth/finalize</code>
          </p>
        </li>
      </ol>
      <h2>Configure this application</h2>
      {window.location.host.endsWith('.csb.app') ? (
        <CSBSetupGuide />
      ) : (
        <LocalSetupGuide />
      )}
      <p>
        You are ready to go! <a href="/login">Log in</a> to use the app.
      </p>
    </div>
  );
};

function useCookieBackedState(cookieName: string, defaultValue = '') {
  const [value, setValue] = useState(Cookie.get(cookieName) ?? defaultValue);
  console.log({ cookieName, value, defaultValue });
  useEffect(() => {
    if (value !== (Cookie.get(cookieName) ?? defaultValue)) {
      console.log('saving', cookieName, value);
      Cookie.set(cookieName, value);
    }
  }, [cookieName, value, defaultValue]);
  return [value, setValue] as const;
}

function CSBSetupGuide() {
  const [clientId, setClientId] = useCookieBackedState('SPOTIFY_CLIENT_ID');
  const [clientSecret, setClientSecret] = useCookieBackedState(
    'SPOTIFY_CLIENT_SECRET'
  );
  const [defaultCountryCode, setDefaultCountryCode] = useCookieBackedState(
    'DEFAULT_COUNTRY_CODE',
    'US'
  );

  return (
    <ol>
      <li>
        <p>
          Enter your credentials here. That will save them into cookies for this
          domain. This should be generally safe, but do not do this on a shared
          browser.
        </p>
        <p>
          ClientId:
          <input
            type="text"
            value={clientId}
            onChange={(e) => setClientId(e.currentTarget.value)}
          />
        </p>
        <p>
          ClientSecret:
          <input
            type="text"
            value={clientSecret}
            onChange={(e) => setClientSecret(e.currentTarget.value)}
          />
        </p>
      </li>
      <li>
        <p>Optionally configure a default country code.</p>
        <input
          type="text"
          value={defaultCountryCode}
          onChange={(e) => setDefaultCountryCode(e.currentTarget.value)}
        />
        <blockquote>
          This is needed to fetch an artist&apos;s top tracks on the artist page
          without needing geolocation.
        </blockquote>
      </li>
      <li>
        <p>Restart the app.</p>
      </li>
    </ol>
  );
}

function LocalSetupGuide() {
  return (
    <ol>
      <li>
        <p>
          Copy your credentials to the root <code>.env</code> file. This file
          should look as follows:
        </p>
        <pre>
          <code>
            SPOTIFY_CLIENT_ID=your_spotify_client_id
            SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
          </code>
        </pre>
      </li>
      <li>
        <p>
          Optionally configure a default country code. To change the default
          country code (<code>US</code>), add an environment variable named{' '}
          <code>DEFAULT_COUNTRY_CODE</code> to your <code>server/.env</code>{' '}
          file.
        </p>
        <pre>
          <code>DEFAULT_COUNTRY_CODE=CA</code>
        </pre>
        <blockquote>
          This is needed to fetch an artist&apos;s top tracks on the artist page
          without needing geolocation.
        </blockquote>
      </li>
      <li>
        <p>Restart the app.</p>
      </li>
    </ol>
  );
}

export const LoadingState = () => {
  return (
    <Flex className={styles.container} direction="column" gap="2rem">
      <Skeleton.Heading level={1} width="20%" />
      <Skeleton.CoverPhoto size="120px" />
    </Flex>
  );
};
