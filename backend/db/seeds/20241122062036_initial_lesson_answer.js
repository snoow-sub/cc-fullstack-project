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
      answer: "ヨガに興味があります", // レッスンに関連する回答
    },
    {
      lesson_id: 1,
      question_id: 2,
      answer: "午前中が最適です",
    },
    {
      lesson_id: 2,
      question_id: 1,
      answer: "ピラティスを試してみたいです",
    },
    {
      lesson_id: 2,
      question_id: 3,
      answer: "静かな場所を希望します",
    },
    {
      lesson_id: 3,
      question_id: 1,
      answer: "ヨガ上級者向けを探しています",
    },
    {
      lesson_id: 3,
      question_id: 2,
      answer: "夕方が良いです",
    },
  ]);
  await knex.raw("select setval(pg_get_serial_sequence('lesson_answer', 'id'), MAX(id)) FROM lesson_answer");
};
