const reservationModel = require("../models/reservationModel");

// 利用者(reservation)を追加
exports.addReservation = async (req, res) => {
  try {
    const reservation = await reservationModel.addReservation(req.body);
    res.status(200).json(reservation);
  } catch (err) {
    res.status(500).json({ error: "Failed to add reservation" });
    console.error(err);
  }
};
