const questionModel = require("../models/questionModel");

//【大西メモ】questionsを全て表示
exports.getQuestion = async (req, res) => {
  try {
    const questions = await questionModel.getQuestions();
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: "Failed to get questions" });
    console.error(err);
  }
};
