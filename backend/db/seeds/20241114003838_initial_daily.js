// npx knex seed:cooking initial_daily --timestamp-filename-prefix
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('daily').del()
  await knex('daily').insert([
    {id: 1, date: '2024-11-13', cookTitle: '味噌汁、かぼちゃの煮付け', drinkTitle:'研修飲み会', cooking: true, drinking: true},
    {id: 2, date: '2024-11-14', cookTitle: '', drinkTitle: '11F飲み会', cooking: false, drinking: true},
    {id: 3, date: '2024-11-15', cookTitle: '', drinkTitle: '', cooking: false, drinking: false},
    {id: 4, date: '2024-11-18', cookTitle: '', drinkTitle: '', cooking: false, drinking: false},
    {id: 5, date: '2024-11-19', cookTitle: '', drinkTitle: '', cooking: false, drinking: false},
    {id: 6, date: '2024-11-20', cookTitle: '', drinkTitle: '', cooking: false, drinking: false},
    {id: 7, date: '2024-11-21', cookTitle: '', drinkTitle: '', cooking: false, drinking: false},
    {id: 8, date: '2024-11-22', cookTitle: '', drinkTitle: '', cooking: false, drinking: false},
    {id: 9, date: '2024-11-25', cookTitle: '', drinkTitle: '', cooking: false, drinking: false},
    {id: 10, date: '2024-11-26', cookTitle: '', drinkTitle: '', cooking: false, drinking: false},
    {id: 11, date: '2024-11-27', cookTitle: '', drinkTitle: '', cooking: false, drinking: false},
    {id: 12, date: '2024-11-28', cookTitle: '', drinkTitle: '', cooking: false, drinking: false},
    {id: 13, date: '2024-11-29', cookTitle: '', drinkTitle: '', cooking: false, drinking: false},
  ])
};
