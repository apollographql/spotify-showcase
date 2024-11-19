import { bench } from '@ark/attest';
import type { Unmasked } from '@apollo/client';
import type {
  SidebarQuery,
  AlbumRouteQuery,
  ArtistRouteQuery,
  CollectionPlaylistsRouteQuery,
  CollectionTracksRouteQuery,
  PlaylistQuery,
  QueueRouteQuery,
  LimitedIntrospectionQuery,
} from './src/types/api';

bench('Unmasked<SidebarQuery>', () => {
  return {} as Unmasked<SidebarQuery>;
}).types([111, 'instantiations']);

bench('AlternativeUnmasked<SidebarQuery>', () => {
  return {} as AlternativeUnmasked<SidebarQuery>;
}).types([31, 'instantiations']);

bench('Unmasked<AlbumRouteQuery>', () => {
  return {} as Unmasked<AlbumRouteQuery>;
}).types([117, 'instantiations']);

bench('AlternativeUnmasked<AlbumRouteQuery>', () => {
  return {} as AlternativeUnmasked<AlbumRouteQuery>;
}).types([34, 'instantiations']);

bench('Unmasked<ArtistRouteQuery>', () => {
  return {} as Unmasked<ArtistRouteQuery>;
}).types([111, 'instantiations']);

bench('AlternativeUnmasked<ArtistRouteQuery>', () => {
  return {} as AlternativeUnmasked<ArtistRouteQuery>;
}).types([31, 'instantiations']);

bench('Unmasked<CollectionPlaylistsRouteQuery>', () => {
  return {} as Unmasked<CollectionPlaylistsRouteQuery>;
}).types([111, 'instantiations']);

bench('AlternativeUnmasked<CollectionPlaylistsRouteQuery>', () => {
  return {} as AlternativeUnmasked<CollectionPlaylistsRouteQuery>;
}).types([31, 'instantiations']);

bench('Unmasked<CollectionTracksRouteQuery>', () => {
  return {} as Unmasked<CollectionTracksRouteQuery>;
}).types([111, 'instantiations']);

bench('AlternativeUnmasked<CollectionTracksRouteQuery>', () => {
  return {} as AlternativeUnmasked<CollectionTracksRouteQuery>;
}).types([31, 'instantiations']);

bench('Unmasked<PlaylistQuery>', () => {
  return {} as Unmasked<PlaylistQuery>;
}).types([117, 'instantiations']);

bench('AlternativeUnmasked<PlaylistQuery>', () => {
  return {} as AlternativeUnmasked<PlaylistQuery>;
}).types([34, 'instantiations']);

bench('Unmasked<QueueRouteQuery>', () => {
  return {} as Unmasked<QueueRouteQuery>;
}).types([111, 'instantiations']);

bench('AlternativeUnmasked<QueueRouteQuery>', () => {
  return {} as AlternativeUnmasked<QueueRouteQuery>;
}).types([31, 'instantiations']);

bench('Unmasked<LimitedIntrospectionQuery>', () => {
  return {} as Unmasked<LimitedIntrospectionQuery>;
}).types([111, 'instantiations']);

bench('AlternativeUnmasked<LimitedIntrospectionQuery>', () => {
  return {} as AlternativeUnmasked<LimitedIntrospectionQuery>;
}).types([31, 'instantiations']);

export type UnwrapFragmentRefs<TData> =
  // Leave TData alone if it is Record<string, any> and not a specific shape
  string extends keyof NonNullable<TData>
    ? TData
    : TData extends { ' $fragmentRefs'?: object | null }
      ? Combine<KeyTuples<TData>> extends infer Flattened
        ? { [K in keyof Flattened]: UnwrapFragmentRefs<Flattened[K]> }
        : never
      : TData extends object
        ? { [K in keyof TData]: UnwrapFragmentRefs<TData[K]> }
        : TData;

export type RemoveMaskedMarker<T> = Omit<T, '__masked'>;

type Values<T> = T extends object ? T[keyof T] : never;

type KeyTuples<V> = V extends object
  ? keyof V extends infer K
    ? K extends keyof V
      ? K extends ' $fragmentRefs'
        ? KeyTuples<Values<V[K]>>
        : K extends ' $fragmentName'
          ? never
          : [K, V[K], {} extends Pick<V, K> ? true : false]
      : never
    : never
  : never;

type Combine<
  Tuple extends [key: string | number | symbol, value: any, optional: boolean],
> = {
  [P in Tuple as P[2] extends true ? P[0] : never]?: P[1];
} & {
  [P in Tuple as P[2] extends false ? P[0] : never]: P[1];
};

export type AlternativeUnmasked<TData> = TData extends object
  ? UnwrapFragmentRefs<RemoveMaskedMarker<TData>>
  : TData;
