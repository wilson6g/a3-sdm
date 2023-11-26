const { createClientUseCase } = require("./create-client-use-case");
const { listAllClientUseCase } = require("./list-all-client-use-case");
const { getProductsPerClientUseCase } = require('./get-products-per-client-use-case');

module.exports = { createClientUseCase, listAllClientUseCase, getProductsPerClientUseCase };
