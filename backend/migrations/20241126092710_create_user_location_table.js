/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_location", function (table) {
    table.increments("id").primary();
    table.integer("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
    table.integer("location_id").notNullable().references("id").inTable("location").onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("user_location");
};
