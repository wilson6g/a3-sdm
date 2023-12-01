const database = require("../../config/database");

async function deleteSellByIdRepository(id) {
  try {
    const rows = await database.query("DELETE FROM sell WHERE id = ?", [id]);

    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = { deleteSellByIdRepository };
