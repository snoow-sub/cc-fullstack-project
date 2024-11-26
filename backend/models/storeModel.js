const knex = require("../knexConfig");

module.exports = {
  async addStore(store) {
    try {
      const storeId = await knex("store").insert(store).returning("id");
      return storeId[0].id;
    } catch (error) {
      throw error;
    }
  },
};
