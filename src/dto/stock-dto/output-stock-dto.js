function outputStockDto(input) {
  return {
    id: input.id,
    fk_product: input.fk_product,
    quantity: input.quantity,
    product_name: input.product_name,
    product_value: parseFloat(input.product_value),
  };
}

module.exports = { outputStockDto };