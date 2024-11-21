/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("store", function (table) {
    table.increments("id").primary();
    table.varchar("address", 255).notNullable();
    table.varchar("info", 255).notNullable();
    table.boolean("certification").notNullable();
    table.varchar("name", 255).notNullable();
  });
};
/**
 * @param { import("knex").Knex } knex
    returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("store");
};
