import { beforeAll, afterAll, afterEach } from 'vitest';
import { server } from './src/mocks/server';

import 'vitest-dom/extend-expect';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
