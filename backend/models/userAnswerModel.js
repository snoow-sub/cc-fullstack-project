const knex = require("../knexConfig");

module.exports = {
  //【大西メモ】userAnswerの追加
  async addUserAnswer(userAnswers) {
    try {
      const idList = [];
      await knex.transaction(async (trx) => {
        for (const obj of userAnswers) {
          const result = await trx("user_answer").insert(obj).returning("id");
          idList.push(result[0].id);
        }
      });
      return idList;
    } catch (error) {
      throw error;
    }
  },
};
