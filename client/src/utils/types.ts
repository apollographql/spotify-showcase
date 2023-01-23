// Helpers thanks to Ben Ilegbodu
// https://www.benmvp.com/blog/forwarding-refs-polymorphic-react-component-typescript/
import React from 'react';
import { Reference } from '@apollo/client';

export type PropsOf<
  TComponent extends
    | keyof JSX.IntrinsicElements
    | React.JSXElementConstructor<unknown>
> = JSX.LibraryManagedAttributes<
  TComponent,
  React.ComponentPropsWithoutRef<TComponent>
>;

type AsProp<TComponent extends React.ElementType> = {
  /**
   * An override of the default HTML tag.
   * Can also be another React component.
   */
  as?: TComponent;
};

/**
 * Allows for extending a set of props (`ExtendedProps`) by an overriding set of props
 * (`OverrideProps`), ensuring that any duplicates are overridden by the overriding
 * set of props.
 */
export type ExtendableProps<
  ExtendedProps = object,
  OverrideProps = object
> = OverrideProps & Omit<ExtendedProps, keyof OverrideProps>;

/**
 * Allows for inheriting the props from the specified element type so that
 * props like children, className & style work, as well as element-specific
 * attributes like aria roles. The component (`TComponent`) must be passed in.
 */
export type InheritableElementProps<
  TComponent extends React.ElementType,
  Props = object
> = ExtendableProps<PropsOf<TComponent>, Props>;

/**
 * A more sophisticated version of `InheritableElementProps` where
 * the passed in `as` prop will determine which props can be included
 */
export type PolymorphicComponentProps<
  TComponent extends React.ElementType,
  Props = object
> = InheritableElementProps<TComponent, Props & AsProp<TComponent>>;

/**
 * Utility type to extract the `ref` prop from a polymorphic component
 */
export type PolymorphicRef<TComponent extends React.ElementType> =
  React.ComponentPropsWithRef<TComponent>['ref'];

/**
 * A wrapper of `PolymorphicComponentProps` that also includes the `ref`
 * prop for the polymorphic component. Useful when using forwardRef with an `as`
 * prop.
 */
export type PolymorphicComponentPropsWithRef<
  C extends React.ElementType,
  Props = object
> = PolymorphicComponentProps<C, Props> & { ref?: PolymorphicRef<C> };

export type WithRef<T, Key extends keyof T> = Omit<T, Key> & {
  [K in Key]: Reference;
};
