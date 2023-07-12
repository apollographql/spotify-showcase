import { OptionalKeysOf } from 'type-fest';

export type NullifyOptionalProperties<T extends object> = Omit<
  T,
  OptionalKeysOf<T>
> & {
  [K in OptionalKeysOf<T>]?: T[K] | null;
};