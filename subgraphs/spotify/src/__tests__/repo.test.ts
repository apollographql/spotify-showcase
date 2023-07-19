import { server } from '../utils/server';

describe('Repository Template Functionality', () => {
  it('Executes Location Entity Resolver', async () => {
    //Arrange
    const query = `query { _service { sdl } }`;

    //Act
    const res = await server.executeOperation({
      query,
    });

    //Assert
    expect(res.body.kind).toEqual('single');
    expect((res.body as any).singleResult.data._service.sdl);
    expect((res.body as any).singleResult.errors).toBeUndefined();
  });
});
