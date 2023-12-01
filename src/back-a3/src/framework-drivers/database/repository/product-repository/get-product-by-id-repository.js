const database = require("../../config/database");

async function getClientByIdRepository(input) {
  try {
    const rows = await database.query("SELECT * FROM client WHERE id = ?", [
      input.id,
    ]);

    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = { getClientByIdRepository };
