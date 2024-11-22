const knex = require("../knexConfig");

module.exports = {
  //【大西メモ】userAnswerの追加
  async addUserAnswer(userAnswer) {
    const result = await knex("user_answer").insert(userAnswer);
    return result;
  },
};
