const database = require("../../config/database");

async function createSellRepository(purchase) {
  try {
    await database.query(
      "INSERT INTO sell (id, quantity, value, fk_client, fk_stock) VALUES (?, ?, ?, ?, ?)",
      [
        purchase.id,
        purchase.quantity,
        purchase.value,
        purchase.fk_client,
        purchase.fk_stock,
      ]
    );

    const purchased = await database.query(
      `SELECT sell.id, sell.value as totalOrder, sell.quantity as orderProductQuantity,  product.name as product_name, product.value as product_value, client.name  as client_name FROM sell left join stock on stock.id = sell.fk_stock  RIGHT JOIN client ON client.id = sell.fk_client LEFT JOIN product ON product.id = stock.fk_product WHERE sell.id = ?`,
      [purchase.id]
    );

    return purchased.length > 0 ? purchased[0] : [];
  } catch (error) {
    throw error;
  }
}

module.exports = { createSellRepository };
