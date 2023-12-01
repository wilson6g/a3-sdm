const crypto = require('crypto');

function inputProductDto(input) {
  return {
    id: crypto.randomUUID(),
    name: input.name,
    value: input.value,
  };
}

module.exports = { inputProductDto };