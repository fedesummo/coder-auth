const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "ecommercecoder",
  },
  pool: {
    min: 0,
    max: 8,
  },
});

(async () => {
  try {
    await knex.schema.createTableIfNotExists("products", (table) => {
      table.increments("id").primary();
      table.string("title");
      table.string("thumbnail");
      table.integer("price");
    });
    console.log("Table #Products created!");
  } catch (err) {
    console.log(err);
  }
})();

(async () => {
  try {
    await knex.schema.createTableIfNotExists("messages", (table) => {
      table.increments("id").primary();
      table.timestamp("timestamp").defaultTo(knex.fn.now());
      table.string("email");
      table.string("message");
    });
    console.log("Table #Messages created!");
  } catch (err) {
    console.log(err);
  }
})();

module.exports = knex;
