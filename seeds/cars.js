exports.seed = async function(knex) {
    await knex("cars").truncate();
    await knex("cars").insert([
        {
            vin: 123,
            make: "Chevy",
            model: "Cobalt",
            mileage: 110000,
            transmission: "automatic",
            title: "clean"
        },
        {
            vin: 456,
            make: "Ford",
            model: "F-150",
            mileage: 210000,
            transmission: "manual",
            title: "clean"
        },
        {
            vin: 789,
            make: "Dodge",
            model: "Viper",
            mileage: 90000,
            transmission: "manual",
            title: "salvage"
        },
    ])
};
