/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // 既存のデータを削除
  await knex("lesson_answer").del();
  //インクリメントリセット
  await knex.raw("select setval(pg_get_serial_sequence('lesson_answer', 'id'), MAX(id)) FROM lesson_answer");
  // データを格納する配列
  const data = [];

  // lesson_id: 1～20, question_id: 1～5 の組み合わせを生成
  for (let lesson_id = 1; lesson_id <= 20; lesson_id++) {
    for (let question_id = 1; question_id <= 5; question_id++) {
      data.push({
        lesson_id,
        question_id,
        answer: parseFloat((Math.floor(Math.random() * 11) / 10).toFixed(1)), // 0.0 ～ 1.0 の範囲で 0.1 刻みのランダムな値
      });
    }
  }

  // 初期データを挿入
  await knex("lesson_answer").insert(data);

  //インクリメントリセット
  await knex.raw("select setval(pg_get_serial_sequence('lesson_answer', 'id'), MAX(id)) FROM lesson_answer");
};
