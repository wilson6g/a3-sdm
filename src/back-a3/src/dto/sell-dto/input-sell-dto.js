const crypto = require("crypto");

function inputSellDto(input) {
  return {
    id: crypto.randomUUID(),
    fk_client: input.fk_client,
    fk_stock: input.fk_stock,
    quantity: input.quantity,
    value: input.value,
  };
}
module.exports = { inputSellDto };
