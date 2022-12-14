import Button from '../components/Button';
import Layout from '../components/Layout';
import Flex from '../components/Flex';
import ApolloLogo from '../components/ApolloLogo';
import SpotifyLogo from '../components/SpotifyLogo';
import useIsLoggedIn from '../hooks/useIsLoggedIn';
import styles from './index.module.scss';

const Index = () => {
  const isLoggedIn = useIsLoggedIn();

  return isLoggedIn ? <LoggedIn /> : <LoggedOut />;
};

const LOGIN_URL = `${process.env.REACT_APP_SERVER_HOST}/oauth/init`;

const LoggedIn = () => {
  return (
    <Layout>
      <Layout.Sidebar>Nav content</Layout.Sidebar>
      <Layout.Header>Stuff in the header</Layout.Header>
      <Layout.Main>Hello!</Layout.Main>
    </Layout>
  );
};

const LoggedOut = () => {
  return (
    <Layout>
      <Layout.Sidebar>
        <Flex inline alignItems="end" direction="column">
          <ApolloLogo size="225px" />
          <SpotifyLogo size="100px" />
        </Flex>
      </Layout.Sidebar>
      <Layout.Header>
        <Button as="a" size="sm" variant="primary" href={LOGIN_URL}>
          Log in
        </Button>
      </Layout.Header>
      <Layout.Main>
        <div className={styles.loggedOutMessage}>
          <h1>Welcome to the Apollo Spotify demo</h1>
          <p>
            This demo app provides a playground to test and learn about various
            Apollo features to understand how Apollo can be used in a moderately
            complex app.
          </p>
          <h2>Getting started</h2>
          <p>
            To use this demo app, you will first need a Spotify developer token.
            This will allow the app to make calls to the Spotify API using this
            app's GraphQL API. Once obtained, you will need to add these
            credentials to the app.
          </p>
          <h2>Register a Spotify application</h2>
          <ol>
            <li>
              <p>
                Visit the{' '}
                <a href="https://developer.spotify.com/dashboard">Dashboard</a>{' '}
                page on the Spotify website and, if necessary, log in. This
                requires a Spotify user account.
              </p>
            </li>
            <li>
              <p>
                Create and register a new application to generate credentials.
                Follow the{' '}
                <a href="https://developer.spotify.com/documentation/general/guides/authorization/app-settings/">
                  App settings guide
                </a>{' '}
                to learn more. We recommend this Spotify app is unique to this
                demo app.
              </p>
            </li>
            <li>
              <p>
                In the "Edit Settings" dialogue, add this app's redirect URI for
                this app to allow this app to sign in to your Spotify account.
              </p>
              <p>
                <code>http://localhost:4000/oauth/finalize</code>
              </p>
            </li>
          </ol>
          <h2>Configure this application</h2>
          <ol>
            <li>
              <p>
                Copy your credentials to <code>server/.env</code>. This file
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
              <p>Restart the app.</p>
            </li>
          </ol>
          <p>
            You are ready to go! <a href={LOGIN_URL}>Log in</a> to use the app.
          </p>
        </div>
      </Layout.Main>
    </Layout>
  );
};

export default Index;
