const { createClientController } = require("./create-client-controller");
const { deleteClientController } = require("./delete-client-controller");
const { getByIdClientController } = require("./get-by-id-client-controller");
const { updateClientController } = require("./update-client-controller");
const {
  productsPerClientController,
} = require("./products-per-client-controller");

module.exports = {
  createClientController,
  deleteClientController,
  getByIdClientController,
  updateClientController,
  productsPerClientController,
};
