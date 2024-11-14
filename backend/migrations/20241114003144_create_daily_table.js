/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('daily', (table) => {
    table.increments('id').primary();
    table.string('date').notNullable();
    table.string('title').notNullable();
    table.boolean('make').notNullable().defaultTo(false);
    table.boolean('need').notNullable().defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('daily');
};
