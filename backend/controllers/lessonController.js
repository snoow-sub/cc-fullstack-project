const lessonModel = require("../models/lessonModel");
const storeModel = require("../models/storeModel");
const userAnswerModel = require("../models/userAnswerModel");
const lessonAnswerModel = require("../models/lessonAnswerModel");
const { getRecommendedLessons } = require("../controllers/recommend");

// レコメンドする講習(lesson)を取得
exports.getUserLessons = async (req, res) => {
  try {
    //console.log(req.query);
    const location = req.query.location;
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);
    //const { location, startDate, endDate } = req.query;
    // const location = "関東";
    // const startDate = "2024-12-01";
    // const endDate = "2024-12-31";
    const userAnswer = await userAnswerModel.getUserAnswer(req.params.id);
    const lessons = await lessonModel.getLessons(location, startDate, endDate);
    // lessonsの各lessonについてlesson answerを取得してリスト化
    let lessonAnswers = [];
    for (let lesson of lessons) {
      const lessonId = lesson.id; // lesson_idを取得
      const answer = await lessonAnswerModel.getLessonAnswer(lessonId); // getLessonAnswerで回答を取得
      lessonAnswers.push({
        lessonId,
        answer, // 取得した回答をlessonAnswersに追加
      });
    }
    //console.log(lessonAnswers);
    const recommendedLessons = await getRecommendedLessons(
      userAnswer,
      lessonAnswers
    );

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
    const popularLessons = await lessonModel.getPopularLessons(
      location,
      startDate,
      endDate
    );

    res.status(200).json(popularLessons);
  } catch (err) {
    res.status(500).json({ error: "Failed to get lessons" });
    console.error(err);
  }
};

// 講習(lesson)を追加
exports.addLesson = async (req, res) => {
  try {
    //各情報の取得
    const storeInfo = req.body.store;
    const lessonInfo = req.body.lesson;
    const lessonAnswerInfo = req.body.lesson_answer;
    //storeへの挿入、idの採番
    const storeId = await storeModel.addStore(storeInfo);
    console.log(storeInfo);
    //lessonへの挿入、idの採番
    lessonInfo.store_id = storeId;
    const lessonId = await lessonModel.addLesson(lessonInfo);

    //lessonAnswerへの挿入
    const lessonAnswerData = lessonAnswerInfo.map((answer) => ({
      ...answer,
      lesson_id: lessonId,
    }));

    const insertedAnswers = await lessonAnswerModel.addLessonAnswer(
      lessonAnswerData
    );

    res.status(201).json({ id: lessonId });
  } catch (err) {
    res.status(500).json({ error: "Failed to add lesson" });
    console.error(err);
  }
};
