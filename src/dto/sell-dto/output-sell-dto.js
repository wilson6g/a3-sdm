function outputSellDto(input) {
  return {
    id: input.id,
    orderProductQuantity: parseInt(input.orderProductQuantity),
    totalOrder: parseFloat(input.totalOrder),
    product_name: input.product_name,
    fk_client: input.fk_client,
    fk_stock: input.fk_stock,
    product_value: parseFloat(input.product_value),
    client_name: input.client_name,
  };
}
module.exports = { outputSellDto };
