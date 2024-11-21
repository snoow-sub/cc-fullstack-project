/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("recommend", function (table) {
    table.increments("id").primary();
    table.integer("user_id").notNullable().references("id").inTable("user").onDelete("CASCADE");
    table.integer("lesson_id").notNullable().references("id").inTable("lesson").onDelete("CASCADE");
    table.float("like").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("recommend");
};
