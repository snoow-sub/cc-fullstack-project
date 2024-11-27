/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // 既存のデータを削除
  await knex("user_answer").del();
  //インクリメントリセット
  await knex.raw("select setval(pg_get_serial_sequence('user_answer', 'id'), MAX(id)) FROM user_answer");
  // データを格納する配列
  const data = [];

  // user_id: 1～10, question_id: 1～5 の組み合わせを生成
  for (let user_id = 1; user_id <= 9; user_id++) {
    for (let question_id = 1; question_id <= 5; question_id++) {
      data.push({
        user_id,
        question_id,
        answer: parseFloat((Math.floor(Math.random() * 11) / 10).toFixed(1)), // 0.0 ～ 1.0 の範囲で 0.1 刻みのランダムな値
      });
    }
  }

  // 初期データを挿入
  await knex("user_answer").insert(data);

  //インクリメントリセット
  await knex.raw("select setval(pg_get_serial_sequence('user_answer', 'id'), MAX(id)) FROM user_answer");
};
