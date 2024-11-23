const knex = require("../knexConfig");

module.exports = {
  //【大西メモ】recommendの追加
  async addRecommend(recommend) {
    try {
      const result = await knex("recommend").insert(recommend).returning("id");
      return result[0].id;
    } catch (error) {
      throw error;
    }
  },
};
