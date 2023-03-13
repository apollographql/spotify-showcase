import { AsyncLocalStorage } from 'async_hooks';
import type { RequestHandler, Request } from 'express';

const requestLocalStorage = new AsyncLocalStorage<Request>();

export const globalRequestMiddleware: RequestHandler = (req, _res, next) => {
  requestLocalStorage.run(req, () => next());
};

export function getRequest() {
  const request = requestLocalStorage.getStore();
  if (!request)
    throw new Error(
      'getRequest called outside of globalRequestMiddleware context'
    );
  return request;
}
