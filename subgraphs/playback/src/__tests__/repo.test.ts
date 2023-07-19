import { wsApolloServer, callbackApolloServer } from '../utils/server';

describe('Callback Apollo Server functionality', () => {
  it('Executes Location Entity Resolver', async () => {
    //Arrange
    const query = `query { _service { sdl } }`;

    //Act
    const res = await callbackApolloServer.executeOperation({
      query,
    });

    //Assert
    expect(res.body.kind).toEqual('single');
    expect((res.body as any).singleResult.data._service.sdl);
    expect((res.body as any).singleResult.errors).toBeUndefined();
  });
});

describe('WebSocket (w/graphql-ws) Apollo Server functionality', () => {
  it('Executes Location Entity Resolver', async () => {
    //Arrange
    const query = `query { _service { sdl } }`;

    //Act
    const res = await wsApolloServer.executeOperation({
      query,
    });

    //Assert
    expect(res.body.kind).toEqual('single');
    expect((res.body as any).singleResult.data._service.sdl);
    expect((res.body as any).singleResult.errors).toBeUndefined();
  });
});
