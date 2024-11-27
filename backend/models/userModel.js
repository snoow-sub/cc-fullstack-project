const knex = require("../knexConfig");

module.exports = {
  async addUser(user) {
    try {
      const { name, sex, birthday, address } = user;
      const indicator = 50;
      const result = await knex("users").insert({ name, sex, birthday, address, indicator }).returning("id");
      return result[0].id;
    } catch (error) {
      throw error;
    }
  },
  async getUser(id) {
    return await knex.select("*").from("users").where("id", "=", id);
  },
};
