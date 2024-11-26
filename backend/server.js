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
const allowedOrigins = [
    'http://ec2-98-82-11-196.compute-1.amazonaws.com:5000',
    'http://ec2-98-82-11-196.compute-1.amazonaws.com:4000',
    'http://ec2-98-82-11-196.compute-1.amazonaws.com:3000',
    'http://ec2-34-207-90-107.compute-1.amazonaws.com:5000',
    'http://ec2-34-207-90-107.compute-1.amazonaws.com:4000',
    'http://ec2-34-207-90-107.compute-1.amazonaws.com:3000',
    'http://98.82.11.196:5000',
    'http://98.82.11.196:4000',
    'http://98.82.11.196:3000',
    'http://34.207.90.107:5000',
    'http://34.207.90.107:4000',
    'http://34.207.90.107:3000',
    'http://localhost:3000',
    'http://localhost:4000',
    'http://localhost:5000'
];
app.use(cors({
    origin: function(origin, callback) {
        // originがundefinedの場合はCORSを許可
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, origin);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));
app.use(logger);

app.use("/api/user", userRoutes);
app.use("/api/user/:id/lesson", userRoutes); //【大西メモ】要らないような気もしてきたかも（/api/userの記載で必要十分？）
//app.use("/api/user/:id/user_answer", userRoutes); //【大西メモ】要らないような気もしてきたかも（/api/userの記載で必要十分？）
app.use("/api/reservation", reservationRoutes);
app.use("/api/lesson", lessonRoutes);
app.use("/api/lesson/popular", lessonRoutes);
app.use("/api/lesson/:id/reservations", lessonRoutes); //【大西メモ】要らないような気もしてきたかも（/api/lessonの記載で必要十分？）

//【大西メモ】question, recommendのルーティングの追加
app.use("/api/question", questionRoutes);
app.use("/api/recommend", recommendRoutes);
app.use("/api/user_answer", userAnswerRoutes);

module.exports = app;
