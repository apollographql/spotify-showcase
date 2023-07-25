import { GraphQLRequest, GraphQLResponse } from '@apollo/server';
import { MockedSpotifyDataSource } from '../utils/mocks';
import { callbackApolloServer, wsApolloServer } from '../utils/server';
import { VariableValues } from '@apollo/server/dist/esm/externalTypes/graphql';
import express from 'express';
import http from 'http';
import { json } from 'body-parser';

const options = {
  contextValue: {
    defaultCountryCode: 'US',
    dataSources: { spotify: new MockedSpotifyDataSource('default') },
  },
};

describe('Callback Apollo Server functionality', () => {
  function executeOperation<T>(
    request: Omit<GraphQLRequest<VariableValues>, 'query'> & {
      query?: string;
    }
  ): Promise<GraphQLResponse<Record<string, T>>> {
    return callbackApolloServer.executeOperation(
      {
        ...request,
      },
      options
    );
  }
  let server: http.Server;
  beforeAll(async () => {
    await callbackApolloServer.start();
  });
  afterAll(async () => {
    await callbackApolloServer.stop();

    if (server) server.close();
  });

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
  it('Executes PausePlaybackMutation', async () => {
    //Arrange
    const query = `mutation PausePlaybackMutation {
      pausePlayback {
        playbackState {
          isPlaying
        }
      }
    }`;

    //Act
    const res = await executeOperation({
      query,
    });

    //Assert
    expect(res.body.kind).toEqual('single');
    expect(
      (res.body as any).singleResult.data.pausePlayback.playbackState.isPlaying
    ).toBeFalsy();
    expect((res.body as any).singleResult.errors).toBeUndefined();
  });
  it('Executes ResumePlaybackMutation - FetchNode:1 of query plan', async () => {
    //Arrange
    const query = `mutation ResumePlaybackMutation {
      resumePlayback {
        playbackState {
          isPlaying
          item {
            __typename
            id
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
    expect(
      (res.body as any).singleResult.data.resumePlayback.playbackState.isPlaying
    ).toBeTruthy();
    expect((res.body as any).singleResult.errors).toBeUndefined();
  });
  it('Executes PlaybackStateSubscriberSubscription - Subscription:Primary of query plan', async () => {
    const app = express();
    const httpServer = http.createServer(app);

    app.post('/callback/:subscriptionId', json(), (req, res, next) => {
      res.sendStatus(204);
    });

    await new Promise<void>(
      (resolve) => (server = httpServer.listen({ port: 8888 }, resolve))
    );

    //Arrange
    const query = `subscription PlaybackStateSubscriberSubscription {
      playbackStateChanged {
        isPlaying
        repeatState
        shuffleState
        actions {
          disallows
        }
        context {
          uri
        }
        device {
          id
          name
          type
          volumePercent
        }
        item {
          __typename
          id
        }
      }
    }`;

    //Act
    const res = await executeOperation({
      query,
      extensions: {
        subscription: {
          callback_url:
            'http://localhost:8888/callback/c4a9d1b8-dc57-44ab-9e5a-6e6189b2b945',
          subscription_id: 'c4a9d1b8-dc57-44ab-9e5a-6e6189b2b945',
          verifier: '123456',
        },
      },
    });

    //Assert
    //The first payload in callback is always null
    expect(res.body.kind).toEqual('single');
    expect((res.body as any).singleResult.errors).toBeUndefined();
  });
});

describe('WebSocket (w/graphql-ws) Apollo Server functionality', () => {
  function executeOperation<T>(
    request: Omit<GraphQLRequest<VariableValues>, 'query'> & {
      query?: string;
    }
  ): Promise<GraphQLResponse<Record<string, T>>> {
    return wsApolloServer.executeOperation(
      {
        ...request,
      },
      options
    );
  }
  beforeAll(async () => {
    await wsApolloServer.start();
  });
  afterAll(async () => {
    await wsApolloServer.stop();
  });
  it('Executes PlaybackStateSubscriberSubscription - Subscription:Primary of query plan', async () => {
    //Arrange
    const query = `subscription PlaybackStateSubscriberSubscription {
      playbackStateChanged {
        isPlaying
        repeatState
        shuffleState
        actions {
          disallows
        }
        context {
          uri
        }
        device {
          id
          name
          type
          volumePercent
        }
        item {
          __typename
          id
        }
      }
    }`;

    //Act
    const res = await executeOperation({
      query,
    });

    //Assert
    //The first payload in callback is always null
    expect(res.body.kind).toEqual('single');
    expect((res.body as any).singleResult.errors).toBeUndefined();
  });
});
