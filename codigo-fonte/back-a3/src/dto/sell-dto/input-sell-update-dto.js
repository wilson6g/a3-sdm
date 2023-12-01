const crypto = require("crypto");

function inputSellUpdateDto(input) {
  return {
    id: input.id,
    fk_client: input.fk_client,
    fk_stock: input.fk_stock,
    quantity: input.quantity,
  };
}
module.exports = { inputSellUpdateDto };
