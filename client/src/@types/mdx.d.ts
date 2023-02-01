type Frontmatter = Record<string, unknown>;

declare module '*.mdx' {
  export const frontmatter: Frontmatter;
}
