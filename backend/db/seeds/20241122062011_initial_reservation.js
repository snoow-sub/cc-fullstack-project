/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // 既存のデータを削除
  await knex("reservation").del();
  //インクリメントリセット
  await knex.raw("select setval(pg_get_serial_sequence('reservation', 'id'), MAX(id)) FROM reservation");
  // 初期データを挿入
  await knex("reservation").insert([
    {
      user_id: 1, // user テーブルの既存 ID を参照
      lesson_id: 1, // lesson テーブルの既存 ID を参照
    },
    {
      user_id: 2,
      lesson_id: 2,
    },
    {
      user_id: 3,
      lesson_id: 3,
    },
    {
      user_id: 1,
      lesson_id: 2,
    },
  ]);
  //インクリメントリセット
  await knex.raw("select setval(pg_get_serial_sequence('reservation', 'id'), MAX(id)) FROM reservation");
};
