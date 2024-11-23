const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
//【大西メモ】question, recommendのルーティングの追加
const questionRoutes = require("./routes/questionRoutes");
const recommendRoutes = require("./routes/recommendRoutes");
const userAnswerRoutes = require("./routes/userAnswerRoutes");

const logger = require("./middleware/logger");

// ミドルウェアの設定
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(logger);

app.use("/api/user", userRoutes);
app.use("/api/user/:id/lesson", userRoutes); //【大西メモ】要らないような気もしてきたかも（/api/userの記載で必要十分？）
//app.use("/api/user/:id/user_answer", userRoutes); //【大西メモ】要らないような気もしてきたかも（/api/userの記載で必要十分？）
app.use("/api/reservation", reservationRoutes);
app.use("/api/lesson", lessonRoutes);
app.use("/api/lesson/:id/reservations", lessonRoutes); //【大西メモ】要らないような気もしてきたかも（/api/lessonの記載で必要十分？）

//【大西メモ】question, recommendのルーティングの追加
app.use("/api/question", questionRoutes);
app.use("/api/recommend", recommendRoutes);
app.use("/api/user_answer", userAnswerRoutes);

module.exports = app;
