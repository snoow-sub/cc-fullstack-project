const knex = require("../knexConfig");

module.exports = {
  async addReservation(reservation) {
    const result = await knex("reservation").insert(reservation);
    return result;
  },
};
