# 01. 技術スタック・環境構築定義

## フレームワーク選定
- **Core:** Next.js (App Router)
  - **理由:** ページ遷移の管理、ルーティング、APIルート（将来的なDB接続）の容易さのため。
  - **Rendering:** 基本的にClient Component (`"use client"`) 多用でOK（SEO不要のため）。
- **Language:** TypeScript (Strict mode)

## スタイリング
- **SCSS (Sass) + CSS Modules**
  - ファイル命名: `[name].module.scss`
  - グローバル定義: `src/styles/globals.scss` (変数、リセットのみ)
  - ミックスイン: `src/styles/mixins.scss` (レスポンシブ、フォント設定)

## ライブラリ要件
1.  **状態管理:** `zustand`
    - ユーザーの進捗、検索フィルターの状態管理に使用。
2.  **アイコン:** `lucide-react`
3.  **クラス名操作:** `clsx`
4.  **検索エンジン:** `fuse.js`
    - クライアントサイドでのあいまい検索実装用。
5.  **ドラッグ＆ドロップ:** `dnd-kit` (または `react-beautiful-dnd`)
    - 管理画面でのステップ並べ替え用。

## ディレクトリ構造
```text
src/
├── app/                  # App Router Pages
├── components/           # UI Components
│   ├── common/           # Button, Input, Modal
│   ├── dashboard/        # ProgressCard, TaskList
│   ├── manual/           # WizardStep, Checklist, MediaViewer
│   └── search/           # SearchBar, ResultList
├── lib/                  # Logic & Stores
│   ├── hooks/            # Custom Hooks
│   ├── store.ts          # Zustand Store
│   ├── search.ts         # Fuse.js Logic
│   └── types.ts          # TypeScript Definitions
├── styles/               # Global SCSS
└── data/                 # Mock Data (JSON/TS)