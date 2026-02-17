---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Astro + GitHubでブログを自動更新！  "
pubDate: 2025-06-29
description: "Github Actionを利用した自動デプロイ手順を解説します"
author: "D4ken"
tags: ["web", "github"]
thumbnail:
  "/thumbnails/afra-ramio-0R2lOqibKgA-unsplash.jpg"
category: Tech
---

「毎回アップロードするのが面倒」「無料でモダンなブログを作りたい」——  
そんなあなたにおすすめなのが **Astro × GitHub Pages × GitHub Actions**！

この記事では、本ブログでも採用しているGitHub Pagesへ**自動公開**する手順を解説します。

## ✅ 準備するもの
- **GitHubアカウント**（未作成なら[公式サイト](https://github.com)へ）  
- **Node.js**（Astroに必要）  
- **Astroプロジェクト**（まだなら以下で作成）

```bash
npm create astro@latest
```

## 🛠 ステップ1：Astroの設定（astro.config.mjs）

### 🔹 ユーザーページ（https://<ユーザー名>.github.io）の場合

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://<ユーザー名>.github.io',
});
```

## 📁 ステップ2：GitHubリポジトリを作成

1. GitHubで新しいリポジトリを作成(github pagesに利用する場合、"ユーザー名.github.io" としてください)
2. Astroプロジェクトをプッシュ

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/<ユーザー名>/<リポジトリ名>.git
git branch -M main
git push -u origin main
```

## ⚙️ ステップ3：GitHub Actionsの設定

`.github/workflows/deploy.yml` を作成し、以下を記述：

```yaml
name: Deploy Astro site to Pages

on:
  push:
    branches: [ "main" ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: 'npm'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 🌐 ステップ4：GitHub Pagesの設定

1. GitHubリポジトリの **Settings > Pages** に移動  
2. 「Build and deployment」→ **Source: GitHub Actions** に設定  

## ✅ デプロイしてみよう！

変更後、以下のようにプッシュすれば自動でデプロイされます：

```bash
git add .
git commit -m "Add blog post"
git push
```

Actionsタブでワークフローが実行され、数分後に公開されます。  
アクセスURL: `https://<ユーザー名>.github.io/<リポジトリ名>`

---

## 🎉 まとめ

これで、**記事を書いてプッシュするだけでブログが更新される**環境が完成です！  
