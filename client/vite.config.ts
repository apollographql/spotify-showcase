import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vitePluginGraphqlLoader } from 'vite-plugin-graphql-loader';

export default defineConfig(async (env) => {
  const mdx = await import('@mdx-js/rollup');
  const remarkFrontmatter = await import('remark-frontmatter');
  const remarkMdxFrontmatter = await import('remark-mdx-frontmatter');

  return {
    define: {
      __DEV__: JSON.stringify(env.mode === 'development'),
    },
    server: {
      open: true,
      port: process.env.PORT ?? 3000,
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
      vitePluginGraphqlLoader(),
    ],
  };
});
