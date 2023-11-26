const { outputStockDto } = require("../../dto/stock-dto/output-stock-dto");
const {
  listStockRepository,
} = require("../../framework-drivers/database/repository/stock-repository/list-stock-repository");
const { HttpStatus } = require("../../util/http-status");

async function productLowerStockUseCase() {
  try {
    const stock = await listStockRepository();

    if (stock.length == 0) {
      const error = new Error(
        "Não é possível listar os produtos com baixo estoque, pois ainda não foi tem nenhum produto no estoque com menos de 10 unidades."
      );
      error.status = HttpStatus.BAD_REQUEST;
      throw error;
    }

    const stockDto = stock.map((item) => outputStockDto(item));

    const lowerStockProducts = stockDto.filter((stock) => stock.quantity <= 5);

    const lowerStockProductsOrder = Object.values(lowerStockProducts).sort(
      (a, b) => a.quantity - b.quantity
    );

    const extractFields = lowerStockProductsOrder.map((stockProduct) => ({
      nome: stockProduct.product_name,
      valor: stockProduct.product_value,
      quantidade: stockProduct.quantity,
    }));

    return extractFields;
  } catch (error) {
    const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    throw {
      message: `Erro ao listar os produtos mais vendidos: ${error.message}`,
      status: status,
    };
  }
}

module.exports = { productLowerStockUseCase };
