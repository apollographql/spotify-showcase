import { TypedDocumentNode, gql, useSuspenseQuery } from '@apollo/client';
import { AuthTokenQuery } from './types/api';
import useSpotifyPlayer from './hooks/useSpotifyPlayer';

const AUTH_TOKEN_QUERY: TypedDocumentNode<AuthTokenQuery> = gql`
  query AuthTokenQuery {
    me {
      auth @client {
        accessToken
      }
    }
  }
`;

const SpotifyConnect = () => {
  const { data } = useSuspenseQuery(AUTH_TOKEN_QUERY);

  useSpotifyPlayer(data.me?.auth.accessToken ?? null);

  return null;
};

export default SpotifyConnect;
