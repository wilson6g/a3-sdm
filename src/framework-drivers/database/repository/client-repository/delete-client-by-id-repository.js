const database = require("../../config/database");

async function deleteClientById(id) {
  try {
    const rows = await database.query("DELETE FROM client WHERE id = ?", [id]);

    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = { deleteClientById };
