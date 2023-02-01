// https://gist.github.com/peterblazejewicz/1ac0d99094d1886e7c9aee7e4faddef3
type FunctionComponent<Props> = (props: Props) => JSX.Element;
type ClassComponent<Props> = new (props: Props) => JSX.ElementClass;
type Component<Props> = FunctionComponent<Props> | ClassComponent<Props>;
interface NestedMDXComponents {
  [key: string]: NestedMDXComponents | Component<unknown>;
}

type MDXComponents = NestedMDXComponents & {
  [Key in keyof JSX.IntrinsicElements]?: Component<JSX.IntrinsicElements[Key]>;
} & {
  /**
   * If a wrapper component is defined, the MDX content will be wrapped inside of it.
   */
  wrapper?: Component<unknown>;
};

interface MDXProps {
  /**
   * Which props exactly may be passed into the component depends on the contents of the MDX
   * file.
   */
  [key: string]: unknown;

  /**
   * This prop may be used to customize how certain components are rendered.
   */
  components?: MDXComponents;
}

declare module '*.mdx' {
  export default function MDXContent(props: MDXProps): JSX.Element;
}
