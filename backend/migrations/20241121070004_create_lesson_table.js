/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("lesson", function (table) {
    table.increments("id").primary();
    table.integer("store_id").unsigned().notNullable().references("id").inTable("store").onDelete("CASCADE");
    table.varchar("title", 255).notNullable();
    table.date("date").notNullable();
    table.time("start_time").notNullable();
    table.time("end_time").notNullable();
    table.string("location", 255).notNullable();
    table.string("description", 255).notNullable();
    table.specificType("imagePath", "text[]").nullable();
    table.specificType("movie_id", "text[]").nullable();
    table.float("review").nullable();
    table.float("indicator").nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("lesson");
};
