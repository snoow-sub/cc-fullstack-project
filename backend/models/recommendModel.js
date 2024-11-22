const knex = require("../knexConfig");

module.exports = {
  //【大西メモ】recommendの追加
  async addRecommend(recommend) {
    const result = await knex("recommend").insert(recommend);
    return result;
  },
};
