/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("lesson_answer", (table) => {
    table.increments("id").primary();
    table.integer("lesson_id").unsigned().notNullable().references("id").inTable("lesson").onDelete("CASCADE");
    table.integer("question_id").unsigned().notNullable().references("id").inTable("question").onDelete("CASCADE");
    table.string("answer", 255);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("lesson_answer");
};
