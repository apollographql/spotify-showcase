import { setContext } from '@apollo/client/link/context';
import { getAccessToken } from '../auth';

const httpAuthLink = setContext(async ({ context }) => {
  const accessToken = await getAccessToken();

  return {
    headers: {
      ...context?.headers,
      'x-access-token': accessToken,
    },
  };
});

export default httpAuthLink;
