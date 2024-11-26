/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // 既存のデータを削除
  await knex("hobby").del();
  //インクリメントリセット
  await knex.raw("select setval(pg_get_serial_sequence('hobby', 'id'), MAX(id)) FROM hobby");
  // 初期データを挿入
  await knex("hobby").insert([
    {
      name: "スポーツ",
    },
    {
      name: "読書",
    },
    {
      name: "音楽",
    },
    {
      name: "ゲーム",
    },
    {
      name: "料理",
    },
    {
      name: "特になし",
    },
  ]);
  //インクリメントリセット
  await knex.raw("select setval(pg_get_serial_sequence('hobby', 'id'), MAX(id)) FROM hobby");
};
