import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("subscriptions", (table) => {
    table.increments();
    table.string("topic").notNullable();
    table.string("url", 2000).nullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTableIfExists("subscriptions");
}
