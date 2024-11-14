# Todo API
Todoアプリのエンドポイントを実装したRESTful APIサーバー。

### ディレクトリ構成

/backend
├── /node_modules    # 依存ライブラリ
├── /middlewares     # ミドルウェア (リクエスト処理に介入する)
├── /controllers     # コントローラ (ルートの処理を担当)
├── /models          # モデル (データベースとのやりとり)
├── /routes          # ルーティングの設定
├── /tests           # テストコード
├── server.js        # アプリケーションのエントリーポイント (app.js)
├── index.js         # サーバーの起動スクリプト (index.js or server.js)
├── package.json     # プロジェクト情報と依存関係
└── README.md        # プロジェクトの説明


### 実装するエンドポイント
GET /health
GET /todos
POST /todos


### Expressの構文
```js
app.use('/path', middleware1, middleware2, middleware3, ...)

app.use(middleware)

// app.use(): ミドルウェアを登録するためのメソッド
// 全てのHTTPメソッド（GET、POST、PUT、DELETEなど）を処理する

app.get('/path', middleware1, middleware2, middleware3, ..., requestHandler)

app.get('/path', requestHandler)

// 特定のHTTPメソッドを処理する
// パスは省略できない。全ての場合は、'*'

middleware = (req, res, next) => {
  // 処理
  next()
}
```