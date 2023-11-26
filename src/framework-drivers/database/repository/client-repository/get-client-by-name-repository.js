const database = require("../../config/database");

async function getClientByNameRepository(name) {
  try {
    const rows = await database.query("SELECT * FROM client WHERE name = ?", [
      name,
    ]);

    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = { getClientByNameRepository };
