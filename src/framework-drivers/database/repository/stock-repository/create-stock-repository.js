const database = require("../../config/database");

async function createStockRepository(stock) {
  try {
    await database.query(
      "INSERT INTO stock (id, quantity, fk_product) VALUES (?, ?, ?)",
      [stock.id, stock.quantity, stock.fk_product]
    );

    const addedStock = await database.query(
      `SELECT stock.*,  product.name as product_name, product.value as product_value FROM stock LEFT JOIN product ON product.id = stock.fk_product WHERE stock.id = ?`,
      [stock.id]
    );

    return addedStock.length > 0 ? addedStock[0] : [];
  } catch (error) {
    throw error;
  }
}

module.exports = { createStockRepository };
