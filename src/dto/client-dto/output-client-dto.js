function outputClientDto(input) {
  return {
    id: input.id,
    name: input.name,
  };
}

module.exports = { outputClientDto };