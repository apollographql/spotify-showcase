// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Frontmatter = Record<string, any>;

declare module '*.mdx' {
  export const frontmatter: Frontmatter;
}
