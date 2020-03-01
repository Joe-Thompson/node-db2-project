
exports.up = async function(knex) {
  await knex.schema.createTable("cars", (table) => {
      table.increments("id");
      table.integer("vin").unique().notNullable();
      table.text("make").notNullable();
      table.text("model").notNullable();
      table.integer("mileage").notNullable();
      table.text("transmission");
      table.text("title");
  })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("cars");
};
