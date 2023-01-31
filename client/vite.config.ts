import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(async () => {
  const mdx = await import('@mdx-js/rollup');

  return {
    server: {
      open: true,
      port: 3000,
    },
    plugins: [mdx.default(), react()],
  };
});
