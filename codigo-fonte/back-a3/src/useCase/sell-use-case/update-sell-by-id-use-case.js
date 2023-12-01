const {
  getSellByIdRepository,
} = require("../../framework-drivers/database/repository/sell-repository/get-sell-by-id-repository");
const {
  updateSellByIdRepository,
} = require("../../framework-drivers/database/repository/sell-repository/update-sell-by-id-repository");
const { HttpStatus } = require("../../util/http-status");
const { buyProductUseCase } = require("../order-use-case/buy-product-use-case");

async function updateSellByIdUseCase(input) {
  try {
    const alreadyExists = await getSellByIdRepository(input);

    if (alreadyExists.length < 0) {
      const error = new Error(
        "Não existe nenhuma venda com esse id na base de dados."
      );
      error.status = HttpStatus.NOT_FOUND;
      throw error;
    }

    if (alreadyExists[0].quantity != input.quantity) {
      const buyOrder = await buyProductUseCase(input);

      return await updateSellByIdRepository(buyOrder);
    }

    const inputUpdated = { ...input, value: alreadyExists[0].value };

    const updatedSell = await updateSellByIdRepository(inputUpdated);

    return updatedSell;
  } catch (error) {
    const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    throw {
      message: `Erro ao atualizar a venda: ${error.message}`,
      status: status,
    };
  }
}

module.exports = { updateSellByIdUseCase };
