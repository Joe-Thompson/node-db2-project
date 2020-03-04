module.exports = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./data/car-dealer.db3"
  },
  pool: {
    afterCreate: (conn, done) => {
      conn.run('PRAGMA foreign_keys = ON', done);
    }
  }
};
