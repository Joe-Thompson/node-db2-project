
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
      .createTable("sales", (table) => {
          table.increments("sale_id");
          table.integer("price").notNullable();
          table.text("customer").notNullable();
          table.integer("vin_sale").unique().unsigned().notNullable().references("vin").inTable("cars")
      })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("sales");
    await knex.schema.dropTableIfExists("cars");
};
