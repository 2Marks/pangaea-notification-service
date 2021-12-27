import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("messages", (table) => {
    table.increments();
    table.string("topic").notNullable();
    table.string("url", 2000).notNullable();
    table.text("data", "medium").nullable();
    table.text("response", "small").nullable();
    table.boolean("is_acknowledged").nullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTableIfExists("messages");
}
