const database = require("../../config/database");

async function deleteStockByIdRepository(id) {
  try {
    const rows = await database.query("DELETE FROM stock WHERE id = ?", [id]);

    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = { deleteStockByIdRepository };
