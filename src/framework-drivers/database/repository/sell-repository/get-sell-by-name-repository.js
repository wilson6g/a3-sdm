const database = require("../../config/database");

async function getSellByProductRepository(fk_product) {
  try {
    const rows = await database.query(
      "SELECT sell.id, sell.value as totalOrder, sell.quantity as orderProductQuantity, sell.fk_client, sell.fk_stock, product.name as product_name, product.value as product_value, client.name  as client_name FROM sell left join stock on stock.id = sell.fk_stock  RIGHT JOIN client ON client.id = sell.fk_client LEFT JOIN product ON product.id = stock.fk_product WHERE fk_product = ?",
      [fk_product]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = { getSellByProductRepository };
