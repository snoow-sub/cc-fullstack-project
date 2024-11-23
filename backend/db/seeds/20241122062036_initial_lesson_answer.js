/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // 既存のデータを削除
  await knex("lesson_answer").del();

  // 初期データを挿入
  await knex("lesson_answer").insert([
    {
      lesson_id: 1, // lesson テーブルの既存 ID を参照
      question_id: 1, // question テーブルの既存 ID を参照
      answer: 0.9,
    },
    {
      lesson_id: 1,
      question_id: 2,
      answer: 0.6,
    },
    {
      lesson_id: 2,
      question_id: 1,
      answer: 0.2,
    },
    {
      lesson_id: 2,
      question_id: 3,
      answer: 0.8,
    },
    {
      lesson_id: 3,
      question_id: 1,
      answer: 0.1,
    },
    {
      lesson_id: 3,
      question_id: 2,
      answer: 0.5,
    },
  ]);
  await knex.raw(
    "select setval(pg_get_serial_sequence('lesson_answer', 'id'), MAX(id)) FROM lesson_answer"
  );
};
