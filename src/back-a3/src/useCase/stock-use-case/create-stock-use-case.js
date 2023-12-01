const { outputStockDto } = require("../../dto/stock-dto/output-stock-dto");
const {
  createStockRepository,
} = require("../../framework-drivers/database/repository/stock-repository/create-stock-repository");
const {
  getStockByProductRepository,
} = require("../../framework-drivers/database/repository/stock-repository/get-stock-by-name-repository");
const { HttpStatus } = require("../../util/http-status");

async function createStockUseCase(stock) {
  try {
    const alreadyExists = await getStockByProductRepository(stock.fk_product);

    if (alreadyExists.length > 0) {
      const error = new Error("Já existe esse produto no estoque.");
      error.status = HttpStatus.BAD_REQUEST;
      throw error;
    }

    const addedStock = await createStockRepository(stock);

    return outputStockDto(addedStock);
  } catch (error) {
    const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    throw {
      message: `Erro ao adicionar um produto ao estoque: ${error.message}`,
      status: status,
    };
  }
}

module.exports = { createStockUseCase };
