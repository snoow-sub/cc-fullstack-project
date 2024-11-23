# フロントエンドの概要
DiscoverUのフロントエンド部分の概要です。

## 使用技術
- React

### ディレクトリ構成
```
/frontend
├── /node_modules         # 依存ライブラリ
├── /public/index.html    # 接続先のHTML
├── /src                  # フロントエンドのソースコード
│   ├── /components       # 子コンポーネント
│   │   ├── SwipeLessons  # スワイプ機能のコンポーネント
│   │   └── UserInput     # ユーザーの入力画面コンポーネント
│   ├── /css              # CSSファイル
│   │   └── *.css         # 各コンポーネントに対するスタイルシート
│   ├── App.jsx           # アプリケーションの親コンポーネント
│   ├── index.js          # サーバーの起動スクリプト
├── package.json          # プロジェクト情報と依存関係
└── README.md             # プロジェクトの説明
```

### アクセス用URL
Local:   `http://localhost:3000` <br />
Global:  `http://ec2-23-22-12-178.compute-1.amazonaws.com:3000`

### セットアップ手順
1. アプリケーションの起動
```bash
npm i
npm run start
```
2. ブラウザでアクセス
   - PCのブラウザを開き、アクセスURLにアクセスをする