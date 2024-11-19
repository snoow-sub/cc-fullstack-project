# フロントエンドの概要
夕食管理アプリで使用するユーザーインターフェースの実装を行いました。

## 使用技術
- React
- FullCalendar

### ディレクトリ構成
```
/frontend
├── /node_modules         # 依存ライブラリ
├── /public/index.html    # 接続先のHTML
├── /src                  # フロントエンドのソースコード
│   ├── /components       # 子コンポーネント
│   │   └── extButton.jsx # 拡張ボタン用の子コンポーネント
│   ├── App.jsx           # アプリケーションの親コンポーネント
│   ├── index.js          # サーバーの起動スクリプト
├── package.json          # プロジェクト情報と依存関係
└── README.md             # プロジェクトの説明
```

### アクセス用URL
Local:            `http://localhost:3000` <br />
On Your Network:  `http://192.168.151.xxx:3000`

### セットアップ手順
1. アプリケーションの起動
```bash
npm i
npm start
```
2. ブラウザでアクセス
   - PCのブラウザを開き、URL欄に「`http://localhost:3000`」と入力しアクセス

### 関数の説明
- 