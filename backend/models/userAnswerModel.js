const knex = require("../knexConfig");

module.exports = {
  //【大西メモ】userAnswerの追加
  async addUserAnswer(userAnswers) {
    try {
      const idList = [];
      await knex.transaction(async (trx) => {
        for (const obj of userAnswers) {
          const result = await knex("user_answer").insert(obj).returning("id");
          idList.push(result[0].id);
        }
      });
      return idList;
    } catch (error) {
      throw error;
    }
  },
  async getUserAnswer(userId) {
    try {
      const answers = await knex("user_answer")
        .select("*")
        //複数同じquestion_idに対して回答している場合は最新の回答を優先
        .whereIn("id", function () {
          this.select(knex.raw("MAX(id)"))
            .from("user_answer")
            .where("user_id", userId) // user_idを絞り込む
            .groupBy("question_id");
        });
      return answers;
    } catch (error) {
      throw error;
    }
  },
};
