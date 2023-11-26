const database = require("../../config/database");

async function listStockRepository() {
  try {
    const rows = await database.query(
      "SELECT stock.*, product.name as product_name, product.value as product_value FROM stock LEFT JOIN product ON product.id = stock.fk_product"
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = { listStockRepository };
