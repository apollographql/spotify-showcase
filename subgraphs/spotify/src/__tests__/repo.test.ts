import { GraphQLRequest, GraphQLResponse } from '@apollo/server';
import { MockSpotifyClient } from 'spotify-api';
import { server } from '../utils/server';
import { VariableValues } from '@apollo/server/dist/esm/externalTypes/graphql';

const options = {
  contextValue: {
    defaultCountryCode: 'US',
    dataSources: { spotify: new MockSpotifyClient('default') },
  },
};

function executeOperation<T>(
  request: Omit<GraphQLRequest<VariableValues>, 'query'> & {
    query?: string;
  }
): Promise<GraphQLResponse<Record<string, T>>> {
  return server.executeOperation(
    {
      ...request,
    },
    options
  );
}

describe('Repository Template Functionality', () => {
  it('Executes Intropspection Query', async () => {
    //Arrange
    const query = `query { _service { sdl } }`;

    //Act
    const res = await executeOperation({
      query,
    });

    //Assert
    expect(res.body.kind).toEqual('single');
    expect((res.body as any).singleResult.data._service.sdl);
    expect((res.body as any).singleResult.errors).toBeUndefined();
  });
  it('Executes Root Query', async () => {
    //Arrange
    const query = `query RootQuery($offset: Int, $limit: Int) {
      me {
        playlists(offset: $offset, limit: $limit) {
          pageInfo {
            offset
            limit
            hasNextPage
          }
          edges {
            node {
              id
              name
              uri
            }
          }
        }
      }
    }`;

    //Act
    const res = await executeOperation({
      query,
    });

    //Assert
    expect(res.body.kind).toEqual('single');
    expect((res.body as any).singleResult.data.me.playlists.edges.node);
    expect((res.body as any).singleResult.errors).toBeUndefined();
  });
  it('Executes ResumePlaybackMutation - FetchNode:2 of query plan', async () => {
    //Arrange
    const query = `query ResumePlaybackMutation ($representations: [_Any!]!) {
      _entities(representations: $representations) {
        ... on PlaybackItem {
          __typename
          name
          durationMs
          ... on Episode {
            show {
              name
              publisher
            }
          }
          ... on Track {
            album {
              name
              artists {
                name
              }
            }
          }
        }
      }
    }`;
    const expected = {
      data: {
        _entities: [
          {
            __typename: 'Track',
            name: 'Starlight',
            durationMs: 240213,
            album: {
              name: 'Black Holes and Revelations',
              artists: [
                {
                  name: 'Muse',
                },
              ],
            },
          },
        ],
      },
    };

    //Act
    const res = await executeOperation({
      query,
      variables: {
        representations: [
          {
            __typename: 'PlaybackItem',
            id: '3skn2lauGk7Dx6bVIt5DVj',
          },
        ],
      },
    });

    //Assert
    expect(res.body.kind).toEqual('single');
    expect((res.body as any).singleResult).toEqual(expected);
    expect((res.body as any).singleResult.errors).toBeUndefined();
  });
  it('Executes CurrentUserQuery', async () => {
    //Arrange
    const query = `query CurrentUserQuery {
      me {
        user {
          id
          displayName
          ...Avatar_user
          __typename
        }
        __typename
      }
    }
    
    fragment Avatar_user on User {
      id
      images {
        url
        __typename
      }
      __typename
    }`;
    const expected = {
      data: {
        me: {
          user: {
            id: 'default',
            displayName: 'GraphOS User',
            images: [],
            __typename: 'User',
          },
          __typename: 'CurrentUser',
        },
      },
    };

    //Act
    const res = await executeOperation({
      query,
    });

    //Assert
    expect(res.body.kind).toEqual('single');
    expect((res.body as any).singleResult).toEqual(expected);
    expect((res.body as any).singleResult.errors).toBeUndefined();
  });
});
