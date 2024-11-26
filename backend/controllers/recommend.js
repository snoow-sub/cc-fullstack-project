const math = require("mathjs");
const lessonModel = require("../models/lessonModel");

module.exports = {
  async getRecommendedLessons(userAnswer, lessonAnswers) {
    //ベクトル変換
    function answertToVector(answers) {
      // question_id順に並べ替え
      answers.sort((a, b) => a.question_id - b.question_id);

      const vector = answers.map((answer) => answer.answer);
      return vector;
    }

    // コサイン類似度を計算
    function cosineSimilarity(vecA, vecB) {
      const dotProduct = math.dot(vecA, vecB); // 内積
      const normA = math.norm(vecA); // ベクトルAのノルム
      const normB = math.norm(vecB); // ベクトルBのノルム
      return dotProduct / (normA * normB); // コサイン類似度
    }

    //ユーザのベクトルを計算
    const userVector = answertToVector(userAnswer);

    //ユーザとレッスンのコサイン類似度を比較
    const lessonUserSimilarities = lessonAnswers.map((lessonAnswer) => {
      //console.log(lessonAnswer);
      const lessonVector = answertToVector(lessonAnswer.answer);
      const similarity = cosineSimilarity(userVector, lessonVector);
      // console.log(lessonVector);
      // console.log(similarity);
      return {
        lessonId: lessonAnswer.lessonId,
        similarity: similarity,
      };
    });

    // 類似度が高い順にソート
    lessonUserSimilarities.sort((a, b) => b.similarity - a.similarity);
    const recommendedLessons = await Promise.all(
      lessonUserSimilarities
        .slice(0, 5)
        .map((lessonInfo) => lessonModel.getLessonById(lessonInfo.lessonId))
    );

    return recommendedLessons;
  },
};
