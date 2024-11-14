// npx knex seed:make initial_daily --timestamp-filename-prefix
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('daily').del()
  await knex('daily').insert([
    {id: 1, date: '2024-11-13', title: 'aaa', make: true, need: false},
    {id: 2, date: '2024-11-14', title: 'bbb', make: true, need: true},
  ]);
};
