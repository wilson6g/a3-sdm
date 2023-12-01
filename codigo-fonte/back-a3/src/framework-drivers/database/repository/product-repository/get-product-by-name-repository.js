const database = require("../../config/database");

async function getProductByNameRepository(name) {
  try {
    const rows = await database.query("SELECT * FROM product WHERE name = ?", [
      name,
    ]);

    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = { getProductByNameRepository };
