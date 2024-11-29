/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // 既存のデータを削除
  await knex("users").del();
  //インクリメントリセット
  await knex.raw("select setval(pg_get_serial_sequence('users', 'id'), MAX(id)) FROM users");
  // 初期データを挿入
  await knex("users").insert([
    {
      id: 1,
      name: "山田 太郎",
      sex: 0, // 男性
      birthday: "1990-01-15", // 生年月日
      address: "東京都新宿区",
      indicator: 85.5, // 指標値
    },
    {
      id: 2,
      name: "佐藤 花子",
      sex: 1, // 女性
      birthday: "1985-07-20",
      address: "大阪府大阪市中央区",
      indicator: 70.2, // 指標値
    },
    {
      id: 3,
      name: "鈴木 次郎",
      sex: 9, // その他
      birthday: "2000-03-10",
      address: "京都府京都市左京区",
      indicator: 90.1, // 指標値
    },
    {
      id: 4,
      name: "田中 一郎",
      sex: 0, // 男性
      birthday: "1995-05-25",
      address: "北海道札幌市中央区",
      indicator: 65.3,
    },
    {
      id: 5,
      name: "高橋 美咲",
      sex: 1, // 女性
      birthday: "1998-11-12",
      address: "福岡県福岡市博多区",
      indicator: 78.8,
    },
    {
      id: 6,
      name: "伊藤 勇",
      sex: 0, // 男性
      birthday: "1988-02-18",
      address: "神奈川県横浜市中区",
      indicator: 82.0,
    },
    {
      id: 7,
      name: "渡辺 幸子",
      sex: 1, // 女性
      birthday: "1992-09-30",
      address: "愛知県名古屋市中区",
      indicator: 74.5,
    },
    {
      id: 8,
      name: "中村 智子",
      sex: 1, // 女性
      birthday: "1975-03-15",
      address: "兵庫県神戸市中央区",
      indicator: 88.7,
    },
    {
      id: 9,
      name: "小林 剛",
      sex: 0, // 男性
      birthday: "1982-06-28",
      address: "広島県広島市中区",
      indicator: 67.4,
    },
    {
      id: 10,
      name: "松本 綾子",
      sex: 1, // 女性
      birthday: "1993-08-21",
      address: "沖縄県那覇市",
      indicator: 79.9,
    },
  ]);
  await knex.raw("select setval(pg_get_serial_sequence('users', 'id'), MAX(id)) FROM users");
};
