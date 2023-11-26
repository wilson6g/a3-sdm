const { createProductController } = require("./create-product-controller");
const { deleteProductController } = require("./delete-product-controller");
const { getByIdProductController } = require("./get-by-id-product-controller");
const { updateProductController } = require("./update-product-controller");

module.exports = {
  createProductController,
  deleteProductController,
  getByIdProductController,
  updateProductController,
};
