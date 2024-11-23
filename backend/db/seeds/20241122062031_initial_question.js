/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // 既存のデータを削除
  await knex("question").del();

  // 初期データを挿入
  await knex("question").insert([
    {
      content: "inoutdoor", // インドア・アウトドア
    },
    {
      content: "scale", // 少人数・大人数
    },
    {
      content: "distance", // 近場・遠方
    },
    {
      content: "silent", // 黙々和気・あいあい
    },
  ]);
  await knex.raw("select setval(pg_get_serial_sequence('question', 'id'), MAX(id)) FROM question");
};
