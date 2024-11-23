/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.varchar("name", 255).notNullable();
    table.integer("sex").notNullable(); //フロント側でその他を9などとするように制御する必要あり。
    table.date("birthday").notNullable();
    table.varchar("address", 255).notNullable();
    table.varchar("hobby", 255).notNullable(); //プルダウンで入力。特になしも入力としてあり得る
    table.varchar("location", 255).notNullable();
    table.float("indicator").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
