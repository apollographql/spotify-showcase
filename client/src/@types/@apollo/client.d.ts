import '@apollo/client';
import { Defer20220824Handler } from '@apollo/client/incremental';
import { HttpLink } from '@apollo/client';

declare module '@apollo/client' {
  export interface TypeOverrides
    extends Defer20220824Handler.TypeOverrides,
      HttpLink.ContextOptions {}
}
