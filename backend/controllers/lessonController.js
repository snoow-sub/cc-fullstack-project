const lessonModel = require("../models/lessonModel");
const userModel = require("../models/userModel");
const { getRecommendedLessons } = require("../controllers/recommend");

// 講習(lesson)を取得
exports.getLessons = async (req, res) => {
  try {
    // const { location, startDate, endDate } = req.query;
    const location = "関東";
    const startDate = "2024-12-01";
    const endDate = "2024-12-31";
    const userData = await userModel.getUser(req.params.id);
    const indicator = userData[0].indicator;
    const lessons = await lessonModel.getLessons(location, startDate, endDate);

    const recommendedLessons = getRecommendedLessons(lessons, indicator);

    res.status(200).json(recommendedLessons);
  } catch (err) {
    res.status(500).json({ error: "Failed to get lessons" });
    console.error(err);
  }
};

// 講習(lesson)を追加
exports.addLesson = async (req, res) => {
  try {
    const result = await lessonModel.addLesson(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to add lesson" });
    console.error(err);
  }
};
