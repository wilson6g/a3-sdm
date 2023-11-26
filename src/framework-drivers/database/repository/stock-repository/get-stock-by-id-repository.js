const database = require("../../config/database");

async function getStockByIdRepository(id) {
  try {
    const rows = await database.query(
      "SELECT stock.*, product.name as product_name, product.value as product_value FROM stock LEFT JOIN product ON product.id = stock.fk_product WHERE stock.id = ?",
      [id]
    );

    return rows.length > 0 ? rows[0] : [];
  } catch (error) {
    throw error;
  }
}

module.exports = { getStockByIdRepository };
