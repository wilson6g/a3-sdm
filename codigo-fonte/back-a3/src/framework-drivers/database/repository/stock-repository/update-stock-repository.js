const database = require("../../config/database");

async function updateStockByIdRepository(stock) {
  try {
    await database.query(
      "UPDATE stock SET quantity = ?, fk_product = ? WHERE id = ?",
      [stock.quantity, stock.fk_product, stock.id]
    );

    const addedStock = await database.query(
      `SELECT stock.*, product.name as product_name, product.value as product_value FROM stock LEFT JOIN product ON product.id = stock.fk_product WHERE stock.id = ?`,
      [stock.id]
    );

    return addedStock.length > 0 ? addedStock[0] : [];
  } catch (error) {
    throw error;
  }
}

module.exports = { updateStockByIdRepository };
