/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // 既存のデータを削除
  await knex("user_hobby").del();
  //インクリメントリセット
  await knex.raw("select setval(pg_get_serial_sequence('user_hobby', 'id'), MAX(id)) FROM user_hobby");
  // 初期データを挿入
  await knex("user_hobby").insert([
    {
      user_id: 1, // user テーブルの既存 ID を参照
      hobby_id: 3, // hobby テーブルの既存 ID を参照
    },
    {
      user_id: 2,
      hobby_id: 2,
    },
    {
      user_id: 3,
      hobby_id: 3,
    },
    {
      user_id: 4,
      hobby_id: 4,
    },
  ]);
  //インクリメントリセット
  await knex.raw("select setval(pg_get_serial_sequence('user_hobby', 'id'), MAX(id)) FROM user_hobby");
};
