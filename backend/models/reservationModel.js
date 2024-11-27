const knex = require("../knexConfig");

module.exports = {
  async addReservation(reservation) {
    try {
      const result = await knex("reservation").insert(reservation).returning("id");
      return result[0];
    } catch (error) {
      throw error;
    }
  },

  async getLessonReservations(lessonId) {
    const reservations = await knex("reservation").select("*").where("lesson_id", lessonId);
    return reservations;
  },
};
