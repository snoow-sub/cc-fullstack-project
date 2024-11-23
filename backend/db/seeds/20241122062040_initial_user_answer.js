/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // 既存のデータを削除
  await knex("user_answer").del();

  // 初期データを挿入
  await knex("user_answer").insert([
    {
      user_id: 1, // user テーブルの既存 ID を参照
      question_id: 1, // question テーブルの既存 ID を参照
      answer: 1.0,
    },
    {
      user_id: 1,
      question_id: 2,
      answer: 0.7,
    },
    {
      user_id: 2,
      question_id: 1,
      answer: 0.3,
    },
    {
      user_id: 3,
      question_id: 3,
      answer: 0.0,
    },
  ]);
  await knex.raw(
    "select setval(pg_get_serial_sequence('user_answer', 'id'), MAX(id)) FROM user_answer"
  );
};
