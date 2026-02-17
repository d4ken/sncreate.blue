# sncreate.blue

個人ブログ **sncreate.blue** のソースコードです。Astro で静的サイトとしてビルドし、GitHub Actions 経由でデプロイする運用を想定しています。

- Site: https://sncreate.blue

---

## 構成

```
/
├── .github/
│   └── workflows/      # CI/CD（ビルド・デプロイ等の GitHub Actions）
├── public/             # 画像などの静的ファイル（そのまま配信）
├── src/                # Astro アプリ本体（ページ/コンポーネント/記事ロジック等）
├── astro.config.mjs    # Astro 設定
├── tsconfig.json       # TypeScript 設定
├── renovate.json       # Renovate（依存更新）の設定
├── package.json        # npm scripts / 依存関係
└── package-lock.json   # 依存関係ロック
```

> ルーティングは Astro の慣例通り `src` 配下の実装から生成されます（例：`/about` `/blog` `/posts/<slug>` `/tags/<tag>` など）。

---

## ローカル開発

```bash
npm install
npm run dev
```

- 開発サーバが起動し、ブラウザで確認できます（Astroのデフォルトは `localhost:4321`）。

ビルド & プレビュー：

```bash
npm run build
npm run preview
```

---

## 記事/ページについて

- 公開サイト上では、記事は `/posts/<slug>`、タグ一覧は `/tags/<tag>` の形で提供されています。
- 記事追加・編集は `src` 配下（Markdown/コンテンツ管理の実装）で行います。まずは `src` 内で `posts` / `tags` / `content` などのディレクトリを起点に読むと追いやすいです。

---

## 環境変数

GA4 などの公開環境変数は、Astro 側で `import.meta.env.PUBLIC_...` として参照します。記事内の例では `PUBLIC_GA_ID` を利用しています。

### ローカル
プロジェクト直下に `.env` を作り、例：

```env
PUBLIC_GA_ID=G-XXXXXXXXXX
```

### GitHub Actions（本番）
Actions で `${{ secrets.<NAME> }}` を使う場合は **Repository secrets** に登録する必要があります（Environment secrets では参照できないケースがある）。

---

## メモ

- `public/` は「そのまま配信」される領域なので、画像・favicon 等の置き場として使います。
- 依存更新は `renovate.json` で自動化（有効化している前提）されています。
