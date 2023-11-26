const crypto = require("crypto");

function inputStockDto(input) {
  return {
    id: crypto.randomUUID(),
    fk_product: input.fk_product,
    quantity: parseInt(input.quantity),
  };
}
module.exports = { inputStockDto };
