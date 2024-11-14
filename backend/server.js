const express = require('express')
const morgan = require('morgan')
const app = express()
const dishRoutes = require('./routes/dishRoutes')
const dinnerRoutes = require('./routes/dinnerRoutes')
const logger = require('./middleware/logger')

// ミドルウェアの設定
app.use(express.json())
app.use(morgan('dev'))
app.use(logger)

// ルーティング
app.use('/api/dish', dishRoutes)
app.use('/api/dinner', dinnerRoutes)

// グローバルエラーハンドラー
// app.use((err, req, res, next) => {
//   console.error(err.stack)
//   res.status(500).json({
//     error: 'Internal Server Error',
//     message: err.message
//   })
// })

app.post('/api/dinner', (req, res) => {
  const { name, price } = req.body
  const dinner = {
    id: Date.now().toString(),
    name,
    price
  }
  dinners.push(dinner)
  res.status(201).json(dinner)
})

module.exports = app