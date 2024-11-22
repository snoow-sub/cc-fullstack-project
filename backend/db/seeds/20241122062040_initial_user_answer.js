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
      answer: "はい", // ユーザー回答
    },
    {
      user_id: 1,
      question_id: 2,
      answer: "いいえ",
    },
    {
      user_id: 2,
      question_id: 1,
      answer: "わからない", // 任意の回答例
    },
    {
      user_id: 3,
      question_id: 3,
      answer: null, // 未回答の場合
    },
  ]);
  await knex.raw("select setval(pg_get_serial_sequence('user_answer', 'id'), MAX(id)) FROM user_answer");
};
