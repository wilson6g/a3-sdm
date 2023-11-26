const crypto = require('crypto');

function inputClientDto(input) {
  return {
    id: crypto.randomUUID(),
    name: input.name,
  };
}

module.exports = { inputClientDto };