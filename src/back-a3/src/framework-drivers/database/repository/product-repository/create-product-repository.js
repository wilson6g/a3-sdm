const database = require("../../config/database");

async function createProductRepository(product) {
  try {
    await database.query("INSERT INTO product (id, name, value) VALUES (?, ?, ?)", [
      product.id,
      product.name,
      product.value,
    ]);

    const createdProduct = await database.query(
      `SELECT * FROM product WHERE id = ?`,
      [product.id]
    );

    return createdProduct.length > 0 ? createdProduct[0] : [];
  } catch (error) {
    throw error;
  }
}

module.exports = { createProductRepository };
