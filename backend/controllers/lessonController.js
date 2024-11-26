const lessonModel = require("../models/lessonModel");
const userModel = require("../models/userModel");
const { getRecommendedLessons } = require("../controllers/recommend");

// レコメンドする講習(lesson)を取得
exports.getLessons = async (req, res) => {
  try {
    const location = req.query.location;
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);
    //const { location, startDate, endDate } = req.query;
    // const location = "関東";
    // const startDate = "2024-12-01";
    // const endDate = "2024-12-31";
    const userData = await userModel.getUser(req.params.id);
    const indicator = userData[0].indicator;
    const lessons = await lessonModel.getLessons(location, startDate, endDate);

    const recommendedLessons = getRecommendedLessons(lessons, indicator); //indicatorをもとにしたレコメンドのロジックはDemoDayまでに実装

    res.status(200).json(recommendedLessons);
  } catch (err) {
    res.status(500).json({ error: "Failed to get lessons" });
    console.error(err);
  }
};

// 人気トップ3の講習(lesson)を取得
exports.getPopularLessons = async (req, res) => {
  try {
    const location = req.query.location;
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);
    const popularLessons = await lessonModel.getPopularLessons(location, startDate, endDate);

    res.status(200).json(popularLessons);
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
