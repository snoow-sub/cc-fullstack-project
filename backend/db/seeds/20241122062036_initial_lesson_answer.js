/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // 既存のデータを削除
  await knex("lesson_answer").del();
  // インクリメントリセット
  await knex.raw("select setval(pg_get_serial_sequence('lesson_answer', 'id'), MAX(id)) FROM lesson_answer");

  const lessonAnswers = [
    {
      lesson_id: 1, // 初心者向けヨガ教室
      answers: { inoutdoor: 0.2, scale: 0.3, distance: 0.5, silent: 0.4, momentum: 0.2 },
    },
    {
      lesson_id: 2, // 生け花教室
      answers: { inoutdoor: 0.1, scale: 0.2, distance: 0.5, silent: 0.1, momentum: 0.0 },
    },
    {
      lesson_id: 3, // 料理教室
      answers: { inoutdoor: 0.1, scale: 0.3, distance: 0.5, silent: 0.2, momentum: 0.0 },
    },
    {
      lesson_id: 4, // 刺繍教室
      answers: { inoutdoor: 0.1, scale: 0.2, distance: 0.5, silent: 0.2, momentum: 0.0 },
    },
    {
      lesson_id: 5, // テニススクール
      answers: { inoutdoor: 0.8, scale: 0.5, distance: 0.5, silent: 0.7, momentum: 0.8 },
    },
    {
      lesson_id: 6, // 初心者向けアウトドアハイキング
      answers: { inoutdoor: 1.0, scale: 0.7, distance: 0.6, silent: 0.5, momentum: 0.7 },
    },
    {
      lesson_id: 7, // リフレッシュヨガ
      answers: { inoutdoor: 0.3, scale: 0.3, distance: 0.5, silent: 0.4, momentum: 0.2 },
    },
    {
      lesson_id: 8, // 夜ヨガセッション
      answers: { inoutdoor: 0.2, scale: 0.2, distance: 0.5, silent: 0.2, momentum: 0.1 },
    },
    {
      lesson_id: 9, // 英会話教室
      answers: { inoutdoor: 0.0, scale: 0.3, distance: 0.5, silent: 0.1, momentum: 0.0 },
    },
    {
      lesson_id: 10, // プログラミング基礎
      answers: { inoutdoor: 0.0, scale: 0.2, distance: 0.5, silent: 0.3, momentum: 0.0 },
    },
    {
      lesson_id: 11, // カラオケレッスン
      answers: { inoutdoor: 0.5, scale: 0.6, distance: 0.5, silent: 0.7, momentum: 0.1 },
    },
    {
      lesson_id: 12, // 写真撮影教室
      answers: { inoutdoor: 0.3, scale: 0.4, distance: 0.5, silent: 0.4, momentum: 0.1 },
    },
    {
      lesson_id: 13, // 初心者向けスイミング
      answers: { inoutdoor: 0.7, scale: 0.5, distance: 0.5, silent: 0.3, momentum: 0.9 },
    },
    {
      lesson_id: 14, // 初心者向けボルダリング
      answers: { inoutdoor: 0.9, scale: 0.5, distance: 0.5, silent: 0.3, momentum: 1.0 },
    },
    {
      lesson_id: 15, // ペイント教室
      answers: { inoutdoor: 0.0, scale: 0.2, distance: 0.5, silent: 0.1, momentum: 0.0 },
    },
    {
      lesson_id: 16, // 瞑想とマインドフルネス
      answers: { inoutdoor: 0.2, scale: 0.1, distance: 0.5, silent: 0.1, momentum: 0.0 },
    },
    {
      lesson_id: 17, // 日本茶教室
      answers: { inoutdoor: 0.1, scale: 0.2, distance: 0.5, silent: 0.1, momentum: 0.0 },
    },
    {
      lesson_id: 18, // 初心者向けドローン操作
      answers: { inoutdoor: 0.5, scale: 0.3, distance: 0.5, silent: 0.2, momentum: 0.1 },
    },
    {
      lesson_id: 19, // 初心者向けランニング
      answers: { inoutdoor: 0.8, scale: 0.4, distance: 0.5, silent: 0.5, momentum: 0.7 },
    },
    {
      lesson_id: 20, // 初心者向けスキー
      answers: { inoutdoor: 1.0, scale: 0.5, distance: 0.5, silent: 0.5, momentum: 0.8 },
    },
  ];

  const data = [];
  for (const lessonAnswer of lessonAnswers) {
    const { lesson_id, answers } = lessonAnswer;
    let question_id = 1;
    for (const [key, value] of Object.entries(answers)) {
      data.push({
        lesson_id,
        question_id,
        answer: value,
      });
      question_id++;
    }
  }

  await knex("lesson_answer").insert(data);

  // インクリメントリセット
  await knex.raw("select setval(pg_get_serial_sequence('lesson_answer', 'id'), MAX(id)) FROM lesson_answer");
};
