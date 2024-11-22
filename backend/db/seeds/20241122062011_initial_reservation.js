/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // 既存のデータを削除
  await knex("reservation").del();

  // 初期データを挿入
  await knex("reservation").insert([
    {
      date: "2024-12-01", // 予約日
      start_time: "10:00:00", // 開始時間
      end_time: "12:00:00", // 終了時間
      user_id: 1, // user テーブルの既存 ID を参照
      store_id: 1, // store テーブルの既存 ID を参照
      lesson_id: 1, // lesson テーブルの既存 ID を参照
    },
    {
      date: "2024-12-03",
      start_time: "14:00:00",
      end_time: "15:30:00",
      user_id: 2,
      store_id: 2,
      lesson_id: 2,
    },
    {
      date: "2024-12-05",
      start_time: "18:00:00",
      end_time: "20:00:00",
      user_id: 3,
      store_id: 1,
      lesson_id: 3,
    },
    {
      date: "2024-12-10",
      start_time: "11:00:00",
      end_time: "12:30:00",
      user_id: 1,
      store_id: 2,
      lesson_id: 2,
    },
  ]);
  await knex.raw("select setval(pg_get_serial_sequence('reservation', 'id'), MAX(id)) FROM reservation");
};
