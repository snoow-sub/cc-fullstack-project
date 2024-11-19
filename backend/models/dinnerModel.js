const knex = require('../knexConfig');

module.exports = {
  // 夕食予定の追加
  async addCooking(cooking) {
    const dinner = await knex('daily').insert(cooking)
    return dinner
  },
  // 夕食予定の削除
  async deleteCooking(date) {
    const dinner = await knex('daily').update({ cooking: null }).where({ date })
    return dinner
  },
  // 飲み会予定の追加
  async addDrinking(drinking) {
    const dinner = await knex('daily').insert(drinking)
    return dinner
  },
  // 飲み会予定の削除
  async deleteDrinking(date) {
    const dinner = await knex('daily').update({ drinking: null }).where({ date })
  },
}