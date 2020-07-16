import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table) => {
    table.increments();
    table.string("name").unique().notNullable();
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table.boolean("activated").defaultTo(false);
    table.integer("token_version").defaultTo(0);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("users");
}
