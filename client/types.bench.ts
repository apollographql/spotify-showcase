/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
// to use this just call `./node_modules/.bin/tsx client/types.bench.ts` from the root

import { attest, bench } from '@ark/attest';
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

bench('SidebarQuery equality', () => {
  attest<Unmasked<SidebarQuery>>({} as AlternativeUnmasked<SidebarQuery>);
  attest<AlternativeUnmasked<SidebarQuery>>({} as Unmasked<SidebarQuery>);
});

bench('Unmasked<AlbumRouteQuery>', () => {
  return {} as Unmasked<AlbumRouteQuery>;
}).types([117, 'instantiations']);

bench('AlternativeUnmasked<AlbumRouteQuery>', () => {
  return {} as AlternativeUnmasked<AlbumRouteQuery>;
}).types([34, 'instantiations']);

bench('SidebarQuery equality', () => {
  type Id<T> = { [K in keyof T]: Id<T[K]> } & {};

  const a = ({} as Unmasked<AlbumRouteQuery['album']>).tracks?.edges[0]!;
  const b = ({} as AlternativeUnmasked<AlbumRouteQuery['album']>).tracks[0]
    ?.edges[0]!;

  type A = Id<typeof a>;
  type B = Id<typeof b>;

  attest<A>({} as B);
  attest<B>({} as A);
});

bench('Unmasked<ArtistRouteQuery>', () => {
  return {} as Unmasked<ArtistRouteQuery>;
}).types([111, 'instantiations']);

bench('AlternativeUnmasked<ArtistRouteQuery>', () => {
  return {} as AlternativeUnmasked<ArtistRouteQuery>;
}).types([31, 'instantiations']);

bench('ArtistRouteQuery equality', () => {
  attest<Unmasked<ArtistRouteQuery>>(
    {} as AlternativeUnmasked<ArtistRouteQuery>
  );
  attest<AlternativeUnmasked<ArtistRouteQuery>>(
    {} as Unmasked<ArtistRouteQuery>
  );
});

bench('Unmasked<CollectionPlaylistsRouteQuery>', () => {
  return {} as Unmasked<CollectionPlaylistsRouteQuery>;
}).types([111, 'instantiations']);

bench('AlternativeUnmasked<CollectionPlaylistsRouteQuery>', () => {
  return {} as AlternativeUnmasked<CollectionPlaylistsRouteQuery>;
}).types([31, 'instantiations']);

bench('CollectionPlaylistsRouteQuery equality', () => {
  attest<Unmasked<CollectionPlaylistsRouteQuery>>(
    {} as AlternativeUnmasked<CollectionPlaylistsRouteQuery>
  );
  attest<AlternativeUnmasked<CollectionPlaylistsRouteQuery>>(
    {} as Unmasked<CollectionPlaylistsRouteQuery>
  );
});

bench('Unmasked<CollectionTracksRouteQuery>', () => {
  return {} as Unmasked<CollectionTracksRouteQuery>;
}).types([111, 'instantiations']);

bench('AlternativeUnmasked<CollectionTracksRouteQuery>', () => {
  return {} as AlternativeUnmasked<CollectionTracksRouteQuery>;
}).types([31, 'instantiations']);

bench('CollectionTracksRouteQuery equality', () => {
  attest<Unmasked<CollectionTracksRouteQuery>>(
    {} as AlternativeUnmasked<CollectionTracksRouteQuery>
  );
  attest<AlternativeUnmasked<CollectionTracksRouteQuery>>(
    {} as Unmasked<CollectionTracksRouteQuery>
  );
});

bench('Unmasked<PlaylistQuery>', () => {
  return {} as Unmasked<PlaylistQuery>;
}).types([117, 'instantiations']);

bench('AlternativeUnmasked<PlaylistQuery>', () => {
  return {} as AlternativeUnmasked<PlaylistQuery>;
}).types([34, 'instantiations']);

bench('PlaylistQuery equality', () => {
  attest<Unmasked<PlaylistQuery>>({} as AlternativeUnmasked<PlaylistQuery>);
  attest<AlternativeUnmasked<PlaylistQuery>>({} as Unmasked<PlaylistQuery>);
});

bench('Unmasked<QueueRouteQuery>', () => {
  return {} as Unmasked<QueueRouteQuery>;
}).types([111, 'instantiations']);

bench('AlternativeUnmasked<QueueRouteQuery>', () => {
  return {} as AlternativeUnmasked<QueueRouteQuery>;
}).types([31, 'instantiations']);

bench('QueueRouteQuery equality', () => {
  attest<Unmasked<QueueRouteQuery>>({} as AlternativeUnmasked<QueueRouteQuery>);
  attest<AlternativeUnmasked<QueueRouteQuery>>({} as Unmasked<QueueRouteQuery>);
});

bench('Unmasked<LimitedIntrospectionQuery>', () => {
  return {} as Unmasked<LimitedIntrospectionQuery>;
}).types([111, 'instantiations']);

bench('AlternativeUnmasked<LimitedIntrospectionQuery>', () => {
  return {} as AlternativeUnmasked<LimitedIntrospectionQuery>;
}).types([31, 'instantiations']);

bench('LimitedIntrospectionQuery equality', () => {
  attest<Unmasked<LimitedIntrospectionQuery>>(
    {} as AlternativeUnmasked<LimitedIntrospectionQuery>
  );
  attest<AlternativeUnmasked<LimitedIntrospectionQuery>>(
    {} as Unmasked<LimitedIntrospectionQuery>
  );
});

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
          : [K, [V[K]], {} extends Pick<V, K> ? true : false]
      : never
    : never
  : never;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I extends U
) => void
  ? I
  : never;

type Combine<
  Tuple extends [
    key: string | number | symbol,
    value: [any],
    optional: boolean,
  ],
> = {
  [P in (Tuple & { 2: false })[0]]: UnionToIntersection<
    (Tuple & { 0: P; 2: false })[1]
  >[0];
} & {
  [P in (Tuple & { 2: true })[0]]?:
    | UnionToIntersection<(Tuple & { 0: P; 2: true })[1]>[0]
    | undefined;
};

export type AlternativeUnmasked<TData> = TData extends object
  ? UnwrapFragmentRefs<RemoveMaskedMarker<TData>>
  : TData;
