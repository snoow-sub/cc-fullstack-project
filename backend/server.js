const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const dishRoutes = require("./routes/dishRoutes");
const dinnerRoutes = require("./routes/dinnerRoutes");
const testRoutes = require("./routes/testRoutes");
// const submitRoutes = require('./routes/submitRoutes')
const logger = require("./middleware/logger");

// ミドルウェアの設定
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(logger);

// ルーティング
app.use("/api/view", dishRoutes);
app.use("/api/dinner", dinnerRoutes);
app.use("/api/activities", testRoutes);
// app.use("/sumbit", submitRoutes);

module.exports = app;
