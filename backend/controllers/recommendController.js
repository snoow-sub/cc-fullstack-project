const recommendModel = require("../models/recommendModel");

// 【大西メモ】利用者のlike/bad(recommend)を追加
exports.addRecommend = async (req, res) => {
  try {
    const recommend = await recommendModel.addRecommend(req.body);
    res.status(200).json(recommend);
  } catch (err) {
    res.status(500).json({ error: "Failed to add recommend" });
    console.error(err);
  }
};
