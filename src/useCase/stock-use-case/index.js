const { createStockUseCase } = require("./create-stock-use-case");
const { listAllStockUseCase } = require("./list-all-stock-use-case");
const { productLowerStockUseCase } = require("./product-lower-stock-use-case");
const { deleteStockByIdUseCase } = require("./delete-stock-by-id-use-case");
const { updateStockByIdUseCase } = require("./update-stock-by-id-use-case");

module.exports = {
  createStockUseCase,
  listAllStockUseCase,
  productLowerStockUseCase,
  deleteStockByIdUseCase,
  updateStockByIdUseCase
};
