/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // 既存のデータを削除
  await knex("store").del();

  // 初期データを挿入
  await knex("store").insert([
    {
      id: 1,
      address: "東京都千代田区丸の内1-1",
      info: "家族経営の小さな本屋。温かい雰囲気が特徴。",
      certification: true,
      name: "丸の内書店",
    },
    {
      id: 2,
      address: "大阪市中央区なんば2-2-2",
      info: "マンガとアニメアートブックの品揃えが豊富。",
      certification: false,
      name: "マンガパラダイス",
    },
    {
      id: 3,
      address: "京都市左京区吉田本町3-3",
      info: "学生に人気の学術書や参考書を多く取り扱う。",
      certification: true,
      name: "京都アカデミック書店",
    },
  ]);
  await knex.raw("select setval(pg_get_serial_sequence('store', 'id'), MAX(id)) FROM store");
};
