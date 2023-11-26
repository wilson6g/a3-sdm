const { createStockController } = require("./create-stock-controller");
const { deleteStockController } = require("./delete-stock-controller");
const { getByIdStockController } = require("./get-by-id-stock-controller");
const { updateStockController } = require("./update-stock-controller");

module.exports = {
  createStockController,
  deleteStockController,
  getByIdStockController,
  updateStockController,
};
