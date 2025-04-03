const Database = require("sqlite3");

const pool = new Database.Database("./rest_countries.db", () => {
  verbose: console.log;
});

pool.run(`
  CREATE TABLE IF NOT EXISTS api_keys (
      id varchar(500) PRIMARY KEY,
      api_key varchar(500) UNIQUE NOT NULL,
      name varchar(50) NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_used DATETIME,
      is_active BOOLEAN DEFAULT 1,
      FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);

module.exports = pool;
