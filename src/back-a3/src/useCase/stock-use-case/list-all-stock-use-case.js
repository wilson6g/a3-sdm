const { outputStockDto } = require("../../dto/stock-dto/output-stock-dto");
const {
  listStockRepository,
} = require("../../framework-drivers/database/repository/stock-repository/list-stock-repository");

async function listAllStockUseCase() {
  try {
    const stocks = await listStockRepository();

    const stocksDto = stocks.map((item) => outputStockDto(item));

    return stocksDto;
  } catch (error) {
    throw new Error(`Erro ao listar os produtos no estoque: ${error.message}`);
  }
}

module.exports = { listAllStockUseCase };
