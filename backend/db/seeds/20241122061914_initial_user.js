/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // 既存のデータを削除
  await knex("users").del();

  // 初期データを挿入
  await knex("users").insert([
    {
      id: 1,
      name: "山田 太郎",
      sex: 1, // 男性
      birthday: "1990-01-15", // 生年月日
      address: "東京都新宿区",
      hobby: "読書", // 趣味（プルダウンから選択）
      location: "関東",
      indicator: 85.5, // 指標値
    },
    {
      id: 2,
      name: "佐藤 花子",
      sex: 2, // 女性
      birthday: "1985-07-20",
      address: "大阪府大阪市中央区",
      hobby: "特になし", // 趣味が特になしの場合
      location: "関西",
      indicator: 70.2, // 指標値
    },
    {
      id: 3,
      name: "鈴木 次郎",
      sex: 9, // その他（フロント側で制御する値）
      birthday: "2000-03-10",
      address: "京都府京都市左京区",
      hobby: "スポーツ", // 趣味（選択）
      location: "関東",
      indicator: 90.1, // 指標値
    },
  ]);
  await knex.raw("select setval(pg_get_serial_sequence('users', 'id'), MAX(id)) FROM users");
};
