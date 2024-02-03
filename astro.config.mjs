import {defineConfig} from 'astro/config';

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  redirects: {
    '/': '/blog/'
  },
  markdown: {
    shikiConfig: {
      // Shikiの組み込みテーマから選択（または独自のテーマを追加）
      theme: 'monokai',
      // 水平スクロールを防ぐために文字の折り返しを有効にする
      wrap: true,
    },
  },
  integrations: [preact()]
});