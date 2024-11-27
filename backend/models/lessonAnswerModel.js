const knex = require("../knexConfig");

module.exports = {
  //【大西メモ】lessonAnswerの追加、未テスト
  async addLessonAnswer(lessonAnswer) {
    try {
      const lessonAnswerId = await knex("lesson_answer")
        .insert(lessonAnswer)
        .returning("id");
      return lessonAnswerId[0].id;
    } catch (error) {
      throw error;
    }
  },
  async getLessonAnswer(lessonId) {
    try {
      const answers = await knex("lesson_answer")
        .select("*")
        //複数同じlesson_idに対して回答している場合は最新の回答を優先
        .whereIn("id", function () {
          this.select(knex.raw("MAX(id)"))
            .from("lesson_answer")
            .where("lesson_id", lessonId) // lesson_idを絞り込む
            .groupBy("question_id");
        });
      return answers;
    } catch (error) {
      throw error;
    }
  },
};
