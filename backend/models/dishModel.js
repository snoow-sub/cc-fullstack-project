const knex = require('../knexConfig');

module.exports = {
  // 登録されているカレンダー情報を取得
  async findAll() {
    const dinner = await knex('daily').select('*')
    return dinner
  }
}