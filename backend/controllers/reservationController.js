const reservationModel = require("../models/reservationModel");
const lessonModel = require("../models/lessonModel");
const userModel = require("../models/userModel");

// 利用者(reservation)を追加
exports.addReservation = async (req, res) => {
  try {
    const reservation = await reservationModel.addReservation(req.body);
    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ error: "Failed to add reservation" });
    console.error(err);
  }
};

exports.getReservedLessons = async (req, res) => {
  try {
    // レッスンIDをparamsから取得
    const lessonId = parseInt(req.params.id);

    //reservationsを取得
    const reservations = await reservationModel.getLessonReservations(lessonId);

    // レッスン情報を取得
    const lessonInfo = await lessonModel.getLessonById(lessonId);

    //参加者のリストを作成
    const participantList = await Promise.all(
      reservations.map(async (reservation) => {
        const user = await userModel.getUser(reservation.user_id);
        return {
          reservationId: reservation.id,
          userId: user[0].id,
          userName: user[0].name,
        };
      })
    );

    // 結果のオブジェクトを作成
    const result = {
      lessonInfo,
      participantList,
    };

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to get reservation" });
    console.error(err);
  }
};
