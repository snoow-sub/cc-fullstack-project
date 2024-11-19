/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('daily', (table) => {
    table.increments('id').primary();
    table.string('date').notNullable();
    table.string('cookTitle');
    table.string('drinkTitle');
    table.boolean('cooking').notNullable().defaultTo(false);
    table.boolean('drinking').notNullable().defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('daily');
};
