const database = require("../../config/database");

async function updateSellByIdRepository(input) {
  try {
    await database.query(
      "UPDATE sell SET quantity = ?, value = ?, fk_client = ?, fk_stock = ? WHERE id = ?",
      [input.quantity, input.value, input.fk_client, input.fk_stock, input.id]
    );

    const purchased = await database.query(
      `SELECT sell.id, sell.value as totalOrder, sell.quantity as orderProductQuantity,  product.name as product_name, product.value as product_value, client.name  as client_name FROM sell left join stock on stock.id = sell.fk_stock  RIGHT JOIN client ON client.id = sell.fk_client LEFT JOIN product ON product.id = stock.fk_product WHERE sell.id = ?`,
      [input.id]
    );

    return purchased.length > 0 ? purchased[0] : [];
  } catch (error) {
    throw error;
  }
}

module.exports = { updateSellByIdRepository };
