import { ConditionalKeys } from 'type-fest';

export type OmitNever<T> = Omit<T, ConditionalKeys<T, never>>;
