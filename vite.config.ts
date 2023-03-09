import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(async () => {
  const mdx = await import('@mdx-js/rollup');
  const remarkFrontmatter = await import('remark-frontmatter');
  const remarkMdxFrontmatter = await import('remark-mdx-frontmatter');

  return {
    server: {
      open: true,
      port: 3000,
    },
    plugins: [
      mdx.default({
        remarkPlugins: [
          remarkFrontmatter.default,
          [remarkMdxFrontmatter.default, { name: 'frontmatter' }],
        ],
      }),
      react({
        babel: {
          plugins: [
            [
              'prismjs',
              {
                languages: [
                  'graphql',
                  'js',
                  'ts',
                  'jsx',
                  'tsx',
                  'js-templates',
                ],
              },
            ],
          ],
        },
      }),
    ],
  };
});
