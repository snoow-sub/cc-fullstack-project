const knex = require("../knexConfig");

module.exports = {
  //【大西メモ】questionsを全て表示
  async getQuestions() {
    const questions = await knex("question").select("*");
    return questions;
  },
};
