/* eslint-disable @typescript-eslint/no-empty-object-type */
import '@apollo/client';
import { Defer20220824Handler } from '@apollo/client/incremental';
import { HttpLink } from '@apollo/client';

declare module '@apollo/client' {
  export interface TypeOverrides extends Defer20220824Handler.TypeOverrides {}

  export interface DefaultContext extends HttpLink.ContextOptions {}
}
