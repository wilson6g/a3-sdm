const mysql = require("mysql2/promise");
const env = require("./env-database-config");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: env.host,
  user: env.user,
  password: env.password,
  database: env.database,
});

async function query(sql, values) {
  try {
    const [results] = await pool.execute(sql, values);

    return results;
  } catch (error) {
    throw error;
  }
}

module.exports = { query };
// module.exports = createConnection;
