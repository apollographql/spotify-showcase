import '@testing-library/jest-dom';
import { beforeAll, afterAll, afterEach } from '@jest/globals';
import { server } from './src/mocks/server';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
