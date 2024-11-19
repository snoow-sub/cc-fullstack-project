# バックエンドの概要
夕食管理アプリで使用するAPIエンドポイントの実装をしています。
また、データベースの設定やMigration、seedによるテスト用データの投入も実施しています。

### 使用技術
- Node.js
- Express
- Knex
- PostgreSQL

### ディレクトリ構成
```
/backend
├── /node_modules    # 依存ライブラリ
├── /middleware     # ミドルウェア (リクエスト処理に介入する)
├── /controllers     # コントローラ (ルートの処理を担当)
├── /models          # モデル (データベースとのやりとり)
├── /routes          # ルーティングの設定
├── /tests           # テストコード
├── /db              # データベースの設定、seeds設定
├── /migrations      # マイグレーションファイルの設定
├── server.js        # アプリケーションのエントリーポイント (app.js)
├── index.js         # サーバーの起動スクリプト (index.js or server.js)
├── knexfile.js      # 環境変数の設定
├── package.json     # プロジェクト情報と依存関係
└── README.md        # プロジェクトの説明
```

### 実装したエンドポイント
`GET /api/view` <br />
`POST /api/dinner` ※作成中

### セットアップ手順
```bash
npm i
npm start
```

### 関数の説明
- 