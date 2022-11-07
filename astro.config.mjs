import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [
      'remark-math',
      'remark-gfm'
    ],
    rehypePlugins: [
      ['rehype-katex', {
      // Katex plugin options
      }]
    ]
  }
});
