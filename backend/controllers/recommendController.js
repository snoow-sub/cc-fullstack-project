const recommendModel = require("../models/recommendModel");

// 【大西メモ】利用者のlike/bad(recommend)を追加
exports.addRecommend = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(500).json({ error: "Body is required" });
    }
    const createdId = await recommendModel.addRecommend(req.body);
    res.status(201).json({ id: createdId });
  } catch (err) {
    res.status(500).json({ error: "Failed to add recommend" });
    console.error(err);
  }
};
