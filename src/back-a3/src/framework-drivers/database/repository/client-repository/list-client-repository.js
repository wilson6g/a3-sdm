const database = require("../../config/database");

async function listClientRepository() {
  try {
    const rows = await database.query("SELECT * FROM client");

    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = { listClientRepository };
