# 04. 検索機能実装ロジック

## 概要
社内ユーザーの入力揺れ（表記揺れ・あいまいな記憶）に対応するため、`fuse.js` を用いたクライアントサイド検索を実装する。
AIによる推論は使用せず、データに付与された `keywords` (隠しタグ) と `title` のマッチング精度を高めることで解決する。

## 実装仕様

### 1. 検索エンジンの設定 (Fuse.js)
`src/lib/search.ts` 等に以下の設定でインスタンスを作成するロジックを配置すること。

```typescript
// 推奨設定
const options = {
  includeScore: true,
  // 0.0=完全一致。0.3~0.4あたりで「多少のタイプミス」を許容する
  threshold: 0.35, 
  keys: [
    { name: 'title', weight: 0.6 },      // タイトル最優先でヒットさせる
    { name: 'keywords', weight: 0.3 },   // 管理者が設定した類義語タグも重視
    { name: 'description', weight: 0.1 } // 説明文は補助的
  ]
};