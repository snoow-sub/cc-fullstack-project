const knex = require("../knexConfig");

module.exports = {
  async addUser(user) {
    const { name, sex, birthday, address, hobby, location } = user;
    const indicator = 50;
    const result = await knex("users")
      .insert({ name, sex, birthday, address, hobby, location, indicator })
      .returning("id");
    return result[0].id;
  },
  async getUser(id) {
    return await knex.select("*").from("users").where("id", "=", id);
  },
};
