const database = require("../../config/database");

async function updateClientByIdRepository(input) {
  try {
    const rows = await database.query(
      "UPDATE client SET name = ? WHERE id = ?",
      [input.name, input.id]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = { updateClientByIdRepository };
