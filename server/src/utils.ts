export type OptionalKeysOf<T> = Exclude<
  { [K in keyof T]: T extends Record<K, T[K]> ? never : K }[keyof T],
  undefined
>;

export type NullifyOptionalProperties<T> = Omit<T, OptionalKeysOf<T>> & {
  [K in OptionalKeysOf<T>]?: T[K] | null;
};
