const database = require("../../config/database");

async function listProductRepository() {
  try {
    const rows = await database.query("SELECT * FROM product");

    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = { listProductRepository };
