/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("lesson", function (table) {
    table.increments("id").primary();
    table.integer("store_id").unsigned().notNullable().references("id").inTable("store").onDelete("CASCADE");
    table.date("date").notNullable();
    table.time("start_time").notNullable();
    table.time("end_time").notNullable();
    table.string("tags", 255).notNullable();
    table.integer("review").nullable(); //reviewのみnullable
    table.float("indicator").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("lesson");
};
