const knex = require("../knexConfig");

module.exports = {
  async getLessons(location, startDate, endDate) {
    const lessons = await knex("lesson") //startDate、endDate考慮。locationはあとで。indicatorは今後の展望
      .select("*")
      .where("location", location)
      .andWhere("date", ">=", startDate)
      .andWhere("date", "<=", endDate);
    return lessons;
  },

  async addLesson(lesson) {
    const result = await knex("lesson").insert(lesson);
    return result;
  },
};
