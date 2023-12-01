const { outputSellDto } = require("../../dto/sell-dto/output-sell-dto");
const {
  listSellRepository,
} = require("../../framework-drivers/database/repository/sell-repository/list-sell-repository");

async function listAllSellUseCase() {
  try {
    const orders = await listSellRepository();

    const sellsDto = orders.map((item) => outputSellDto(item));

    return sellsDto;
  } catch (error) {
    throw new Error(`Erro ao listar os pedidos de compra: ${error.message}`);
  }
}

module.exports = { listAllSellUseCase };
