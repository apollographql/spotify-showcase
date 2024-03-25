import '@testing-library/jest-dom';
import { beforeAll, afterAll, afterEach, jest } from '@jest/globals';
import { server } from './src/mocks/server';
import { gql } from '@apollo/client';

gql.disableFragmentWarnings();

const mockLocalStorage: Record<string, string> = {};

(global as any).Storage.prototype.setItem = jest.fn(
  (key: string, value: string) => {
    // console.log('setting: ', { key, value });
    return (mockLocalStorage[key] = value);
  }
);
(global as any).Storage.prototype.getItem = jest.fn((key: string) => {
  // console.log('getting: ', { key, value: mockLocalStorage[key] });
  return mockLocalStorage[key];
});

localStorage.setItem('accessToken', 'foo');
localStorage.setItem('expiresAt', 'bar');
localStorage.setItem('refreshToken', 'baz');

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
