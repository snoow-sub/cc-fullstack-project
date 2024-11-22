/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // 既存のデータを削除
  await knex("recommend").del();

  // 初期データを挿入
  await knex("recommend").insert([
    {
      user_id: 1, // user テーブルの既存 ID を参照
      lesson_id: 1, // lesson テーブルの既存 ID を参照
      like: 4.5, // 推奨度 (0.0〜5.0 の範囲を仮定)
    },
    {
      user_id: 2,
      lesson_id: 2,
      like: 3.8,
    },
    {
      user_id: 1,
      lesson_id: 3,
      like: 5.0,
    },
    {
      user_id: 3,
      lesson_id: 1,
      like: 4.0,
    },
    {
      user_id: 3,
      lesson_id: 2,
      like: 4.2,
    },
  ]);
  await knex.raw("select setval(pg_get_serial_sequence('recommend', 'id'), MAX(id)) FROM recommend");
};
