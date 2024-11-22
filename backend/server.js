const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const dishRoutes = require("./routes/dishRoutes");
const dinnerRoutes = require("./routes/dinnerRoutes");
const userRoutes = require("./routes/userRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const lessonRoutes = require("./routes/lessonRoutes");

const logger = require("./middleware/logger");

// ミドルウェアの設定
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(logger);

// ルーティング
//app.use("/api/view", dishRoutes);
//app.use("/api/dinner", dinnerRoutes);

app.use("/api/user", userRoutes);
app.use("/api/user/:id/lesson", userRoutes);
app.use("/api/reservation", reservationRoutes);
app.use("/api/lesson", lessonRoutes);
app.use("/api/lesson/:id/reservations", lessonRoutes);

module.exports = app;
