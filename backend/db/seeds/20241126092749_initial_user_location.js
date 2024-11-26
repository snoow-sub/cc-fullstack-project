/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // 既存のデータを削除
  await knex("user_location").del();
  //インクリメントリセット
  await knex.raw("select setval(pg_get_serial_sequence('user_location', 'id'), MAX(id)) FROM user_location");
  // 初期データを挿入
  await knex("user_location").insert([
    {
      user_id: 1, // user テーブルの既存 ID を参照
      location_id: 3, // location テーブルの既存 ID を参照
    },
    {
      user_id: 2,
      location_id: 2,
    },
    {
      user_id: 3,
      location_id: 3,
    },
    {
      user_id: 4,
      location_id: 4,
    },
  ]);
  //インクリメントリセット
  await knex.raw("select setval(pg_get_serial_sequence('user_location', 'id'), MAX(id)) FROM user_location");
};
