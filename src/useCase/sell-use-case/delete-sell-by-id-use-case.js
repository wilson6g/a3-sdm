const {
  deleteSellByIdRepository,
} = require("../../framework-drivers/database/repository/sell-repository/delete-sell-by-id-repository");
const {
  getSellByIdRepository,
} = require("../../framework-drivers/database/repository/sell-repository/get-sell-by-id-repository");
const { HttpStatus } = require("../../util/http-status");

async function deleteSellByIdUseCase(input) {
  try {
    const alreadyExists = await getSellByIdRepository(input);

    if (alreadyExists.length < 0) {
      const error = new Error("Venda não encontrada na base de dados.");
      error.status = HttpStatus.NOT_FOUND;
      throw error;
    }

    const removeSell = await deleteSellByIdRepository(input.id);

    return removeSell;
  } catch (error) {
    const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    throw {
      message: `Erro ao remover a venda: ${error.message}`,
      status: status,
    };
  }
}

module.exports = { deleteSellByIdUseCase };
