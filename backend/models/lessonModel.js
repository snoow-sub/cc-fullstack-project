const knex = require("../knexConfig");

module.exports = {
  async getLessons(location, startDate, endDate) {
    if (location === "東京都") {
      const lessons = await knex("lesson")
        .select("*")
        .andWhere("date", ">=", startDate)
        .andWhere("date", "<=", endDate);
      return lessons;
    }

    const lessons = await knex("lesson")
      .select("*")
      .where("location", location)
      .andWhere("date", ">=", startDate)
      .andWhere("date", "<=", endDate);
    return lessons;
  },

  async getLessonById(lessonId) {
    const [lesson] = await knex("lesson").select("*").where("id", lessonId);
    return lesson;
  },

  async getPopularLessons(location, startDate, endDate) {
    if (location === "東京都") {
      const lessons = await knex("lesson")
        .select("*")
        .andWhere("date", ">=", startDate)
        .andWhere("date", "<=", endDate)
        .orderByRaw("review DESC NULLS LAST") // review を降順でソートし、NULL を最後に配置(ordarbyと書くと、DBの仕様によってはnullが最大値として扱われてしまうためこのような書き方)
        .orderBy("date", "asc") //同じreviewが複数あった場合は日程順で取得。これがいいかは怪しい。indicatorを使うのがよいか
        .limit(3);
      return lessons;
    }

    const lessons = await knex("lesson")
      .select("*")
      .where("location", location)
      .andWhere("date", ">=", startDate)
      .andWhere("date", "<=", endDate)
      .orderByRaw("review DESC NULLS LAST") // review を降順でソートし、NULL を最後に配置(ordarbyと書くと、DBの仕様によってはnullが最大値として扱われてしまうためこのような書き方)
      .orderBy("date", "asc") //同じreviewが複数あった場合は日程順で取得。これがいいかは怪しい。indicatorを使うのがよいか
      .limit(3);
    return lessons;
  },

  async addLesson(lesson) {
    try {
      // console.log(lesson);
      const lessonId = await knex("lesson").insert(lesson).returning("id");
      // console.log(lessonId);
      return lessonId[0].id;
    } catch (error) {
      throw error;
    }
  },
};
