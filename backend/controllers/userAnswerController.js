const userAnswerModel = require("../models/userAnswerModel");

//【大西メモ】paramsに含まれるuser_idのユーザに対してuser_answerをinsert
exports.addUserAnswer = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(500).json({ error: "Body is required" });
    }
    const data = req.body;
    const id = data.user_id;
    const insertData = data.user_answer.map((value) => {
      return { ...value, user_id: id };
    });
    const createdId = await userAnswerModel.addUserAnswer(insertData);
    res.status(201).json({ id: createdId });
  } catch (err) {
    res.status(500).json({ error: "Failed to add user-answer" });
    console.error(err);
  }
};
