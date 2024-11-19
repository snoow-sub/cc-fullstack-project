const app = require('./server')
const cors = require('cors');

const port = process.env.PORT || 3001
app.set('port', port);

// CORSミドルウェアを使用
app.use(cors());

// サーバースタート
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})