const database = require("../../config/database");

async function updateProductByIdRepository(input) {
  try {
    const rows = await database.query(
      "UPDATE client SET name = ?, value = ? WHERE id = ?",
      [input.name, input.id]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = { updateProductByIdRepository };
