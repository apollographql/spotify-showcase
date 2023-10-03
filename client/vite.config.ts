import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import graphql from '@rollup/plugin-graphql';

export default defineConfig(async () => {
  const mdx = await import('@mdx-js/rollup');
  const remarkFrontmatter = await import('remark-frontmatter');
  const remarkMdxFrontmatter = await import('remark-mdx-frontmatter');

  return {
    server: {
      open: true,
      port: process.env.PORT ?? 3000,
    },
    plugins: [
      graphql(),
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
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./setupTests.ts'],
      // solves CJS/ESM dual package hazard issue with graphql
      // whereby some imports resolve with CJS version and some the ESM version
      // see: https://github.com/vitejs/vite/issues/7879#issuecomment-1349079757
      server: {
        deps: {
          fallbackCJS: true,
        },
      }
    },
  };
});
