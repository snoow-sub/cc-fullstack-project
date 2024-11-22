const userAnswerModel = require("../models/userAnswerModel");

//【大西メモ】paramsに含まれるuser_idのユーザに対してuser_answerをinsert
exports.addUserAnswer = async (req, res) => {
  try {
    const result = await userAnswerModel.addUserAnswer(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to add user-answer" });
    console.error(err);
  }
};
