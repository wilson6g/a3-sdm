function outputProductDto(input) {
  return {
    id: input.id,
    name: input.name,
    value: parseFloat(input.value),
  };
}

module.exports = { outputProductDto };
