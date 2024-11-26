/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // 既存のデータを削除
  await knex("user_possibletime").del();
  //インクリメントリセット
  await knex.raw("select setval(pg_get_serial_sequence('user_possibletime', 'id'), MAX(id)) FROM user_possibletime");
  // 初期データを挿入
  await knex("user_possibletime").insert([
    {
      user_id: 1, // user テーブルの既存 ID を参照
      select_datetime: "2024-12-01T10:00:00", // 選択可能な日時
    },
    {
      user_id: 1,
      select_datetime: "2024-12-03T14:00:00",
    },
    {
      user_id: 2,
      select_datetime: "2024-12-02T09:00:00",
    },
    {
      user_id: 2,
      select_datetime: "2024-12-04T16:00:00",
    },
    {
      user_id: 3,
      select_datetime: "2024-12-05T18:00:00",
    },
  ]);
  //インクリメントリセット
  await knex.raw("select setval(pg_get_serial_sequence('user_possibletime', 'id'), MAX(id)) FROM user_possibletime");
};
