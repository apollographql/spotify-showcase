import * as BaseSchemaTypes from '../../types/api';
import { LocalState } from '@apollo/client/local-state';
import { DeepPartial } from '@apollo/client/utilities';
import { DefaultContext } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export enum ColorFormat {
  Rgb = 'RGB',
}

export type Image = {
  __typename: 'Image';
  vibrantColor?: Maybe<Scalars['String']['output']>;
};

export type ImageVibrantColorArgs = {
  alpha?: InputMaybe<Scalars['Float']['input']>;
  format: ColorFormat;
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: Scalars['Boolean']['output'];
  ColorFormat: ColorFormat;
  Float: Scalars['Float']['output'];
  Image: Image;
  String: Scalars['String']['output'];
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Float: Scalars['Float']['output'];
  Image: Omit<DeepPartial<BaseSchemaTypes.Image>, 'vibrantColor'>;
  String: Scalars['String']['output'];
};

export type ImageResolvers = {
  vibrantColor?: LocalState.Resolver<
    Maybe<ResolversTypes['String']>,
    ResolversParentTypes['Image'],
    DefaultContext,
    RequireFields<ImageVibrantColorArgs, 'format'>
  >;
};

export type Resolvers = {
  Image?: ImageResolvers;
};
