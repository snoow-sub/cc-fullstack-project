/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // 既存のデータを削除
  await knex("location").del();
  //インクリメントリセット
  await knex.raw("select setval(pg_get_serial_sequence('location', 'id'), MAX(id)) FROM location");
  // 初期データを挿入
  await knex("location").insert([
    {
      name: "自宅",
    },
    {
      name: "千葉県",
    },
    {
      name: "東京都",
    },
    {
      name: "埼玉県",
    },
    {
      name: "神奈川県",
    },
    {
      name: "茨城県",
    },
  ]);
  //インクリメントリセット
  await knex.raw("select setval(pg_get_serial_sequence('location', 'id'), MAX(id)) FROM location");
};
