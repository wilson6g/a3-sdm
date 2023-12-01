const { outputSellDto } = require("../../dto/sell-dto/output-sell-dto");
const {
  createSellRepository,
} = require("../../framework-drivers/database/repository/sell-repository/create-sell-repository");
const { HttpStatus } = require("../../util/http-status");
const { buyProductUseCase } = require("../order-use-case/buy-product-use-case");

async function createSellUseCase(order) {
  try {
    const buyOrder = await buyProductUseCase(order);

    const createOrder = await createSellRepository(buyOrder);

    return outputSellDto(createOrder);
  } catch (error) {
    const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    throw {
      message: `Erro ao realizer uma venda: ${error.message}`,
      status: status,
    };
  }
}

module.exports = { createSellUseCase };
