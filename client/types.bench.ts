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
      ? Recombine<Entries<TData>> extends infer Flattened
        ? { [K in keyof Flattened]: UnwrapFragmentRefs<Flattened[K]> }
        : never
      : TData extends object
        ? { [K in keyof TData]: UnwrapFragmentRefs<TData[K]> }
        : TData;

export type RemoveMaskedMarker<T> = Omit<T, '__masked'>;

type Values<T> = T extends object ? T[keyof T] : never;

type Entries<V> = V extends object
  ? keyof V extends infer K
    ? K extends keyof V
      ? K extends ' $fragmentRefs'
        ? Entries<Values<V[K]>>
        : K extends ' $fragmentName'
          ? never
          : {
              key: K;
              value: [V[K]];
              optional: {} extends Pick<V, K> ? true : false;
            }
      : never
    : never
  : never;

type IsArray<T> = T extends Array<any> ? true : false;
type ArrValues<Arr> = Arr extends Array<infer Val> ? Val : never;
type MergeObjectUnions<U> =
  IsArray<U> extends true
    ? Array<MergeObjectUnions<ArrValues<U>>>
    : (U extends object ? (k: U) => void : never) extends (
          k: infer I extends U
        ) => void
      ? I
      : U;

type Recombine<
  Entries extends { key: PropertyKey; value: [any]; optional: boolean },
> = {
  [P in (Entries & { optional: false })['key']]: MergeObjectUnions<
    (Entries & { key: P; optional: false })['value']
  >[0];
} & {
  [P in (Entries & { optional: true })['key']]?:
    | MergeObjectUnions<(Entries & { key: P; optional: true })['value']>[0]
    | undefined;
};

export type AlternativeUnmasked<TData> = TData extends object
  ? UnwrapFragmentRefs<RemoveMaskedMarker<TData>>
  : TData;

function unmasked<T>(): Unmasked<T> {
  return {} as any;
}

import { expectTypeOf } from 'expect-type';

bench('type tests', () => {
  // Unmasked maps primitive values to themselves
  expectTypeOf(unmasked<number>()).toEqualTypeOf<number>();
  expectTypeOf(unmasked<string>()).toEqualTypeOf<string>();
  expectTypeOf(unmasked<boolean>()).toEqualTypeOf<boolean>();
  // @ts-expect-error we don't really need this to work
  expectTypeOf(unmasked<undefined>()).toEqualTypeOf<undefined>();
  // @ts-expect-error we don't really need this to work
  expectTypeOf(unmasked<null>()).toEqualTypeOf<null>();
  expectTypeOf(unmasked<{}>()).toEqualTypeOf<{}>();

  // normal selection without fragments
  expectTypeOf(unmasked<{ __typename: 'Track'; id: number }>()).toEqualTypeOf<{
    __typename: 'Track';
    id: number;
  }>();

  // optional property
  expectTypeOf(
    unmasked<{
      __typename: 'Track';
      id: number;
      name?: string;
    }>()
  ).toEqualTypeOf<{
    __typename: 'Track';
    id: number;
    name?: string;
  }>();

  // nullable property
  expectTypeOf(
    unmasked<{
      __typename: 'Track';
      id: number;
      name: null;
    }>()
  ).toEqualTypeOf<{
    __typename: 'Track';
    id: number;
    name: null;
  }>();

  // optional nullable property
  expectTypeOf(
    unmasked<{
      __typename: 'Track';
      id: number;
      name?: null;
    }>()
  ).toEqualTypeOf<{
    __typename: 'Track';
    id: number;
    name?: null;
  }>();

  // with a fragment
  expectTypeOf(
    unmasked<{
      __typename: 'Track';
      id: number;
      ' $fragmentRefs'?: {
        Test: {
          name: string;
        };
      };
    }>()
  ).toEqualTypeOf<{
    __typename: 'Track';
    id: number;
    name: string;
  }>();

  {
    // with a fragment on a subtype
    expectTypeOf(
      unmasked<
        | {
            __typename: 'Track';
            id: number;
            ' $fragmentRefs'?: {
              Fragment__Track: {
                ' $fragmentName'?: 'Fragment__Track';
                __typename: 'Track';
                name: string;
              };
            };
          }
        | {
            __typename: 'Album';
            id: number;
          }
      >()
    ).branded.toEqualTypeOf<
      | {
          __typename: 'Track';
          id: number;
          name: string;
        }
      | {
          __typename: 'Album';
          id: number;
        }
    >();
  }

  {
    // with one fragment per subtype
    expectTypeOf(
      unmasked<
        | {
            __typename: 'Track';
            id: number;
            ' $fragmentRefs'?: {
              Fragment__Track: {
                ' $fragmentName'?: 'Fragment__Track';
                __typename: 'Track';
                name: string;
              };
            };
          }
        | {
            __typename: 'Album';
            id: number;
            ' $fragmentRefs'?: {
              Fragment__Album: {
                ' $fragmentName'?: 'Fragment__Album';
                __typename: 'Album';
                release: number;
              };
            };
          }
      >()
    ).branded.toEqualTypeOf<
      | {
          __typename: 'Track';
          id: number;
          name: string;
        }
      | {
          __typename: 'Album';
          id: number;
          release: number;
        }
    >();
  }

  {
    // with one two fragments on the same subtype, different selection
    expectTypeOf(
      unmasked<
        | {
            __typename: 'Track';
            id: number;
            ' $fragmentRefs'?: {
              Fragment__Track: {
                ' $fragmentName'?: 'Fragment__Track';
                __typename: 'Track';
                name: string;
              };
              Fragment__TrackDetails: {
                ' $fragmentName'?: 'Fragment__TrackDetails';
                __typename: 'Track';
                length: number;
              };
            };
          }
        | {
            __typename: 'Album';
            id: number;
          }
      >()
    ).branded.toEqualTypeOf<
      | {
          __typename: 'Track';
          id: number;
          name: string;
          length: number;
        }
      | {
          __typename: 'Album';
          id: number;
        }
    >();
  }

  {
    // selection in array
    expectTypeOf(
      unmasked<{
        __typename: 'Track';
        id: number;
        artists: Array<{
          __typename: 'Artist';
          id: number;
          ' $fragmentRefs'?: {
            Fragment__Artist: {
              ' $fragmentName'?: 'Fragment__Artist';
              __typename: 'Artist';
              birthdate: string;
            };
          };
        }>;
      }>()
    ).branded.toEqualTypeOf<{
      __typename: 'Track';
      id: number;
      artists: Array<{
        __typename: 'Artist';
        id: number;
        birthdate: string;
      }>;
    }>();
  }

  {
    // overlapping array from parent fragment
    expectTypeOf(
      unmasked<{
        __typename: 'Track';
        id: number;
        artists: Array<{
          __typename: 'Artist';
          id: number;
          ' $fragmentRefs'?: {
            Fragment__Artist: {
              ' $fragmentName'?: 'Fragment__Artist';
              __typename: 'Artist';
              birthdate: string;
            };
          };
        }>;
        ' $fragmentRefs'?: {
          Fragment__Track: {
            ' $fragmentName'?: 'Fragment__Track';
            __typename: 'Track';
            artists: Array<{
              __typename: 'Artist';
              lastname: string;
            }>;
          };
        };
      }>()
    ).branded.toEqualTypeOf<{
      __typename: 'Track';
      id: number;
      artists: Array<{
        __typename: 'Artist';
        id: number;
        birthdate: string;
        lastname: string;
      }>;
    }>();
  }
});
