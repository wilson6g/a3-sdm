const {
  getClientByIdRepository,
} = require("../../framework-drivers/database/repository/client-repository/get-client-by-id-repository");
const {
  updateClientByIdRepository,
} = require("../../framework-drivers/database/repository/client-repository/update-client-by-id-repository");
const {
  getStockByIdRepository,
} = require("../../framework-drivers/database/repository/stock-repository/get-stock-by-id-repository");
const {
  getStockByProductRepository,
} = require("../../framework-drivers/database/repository/stock-repository/get-stock-by-name-repository");
const {
  updateStockByIdRepository,
} = require("../../framework-drivers/database/repository/stock-repository/update-stock-repository");
const { HttpStatus } = require("../../util/http-status");

async function updateStockByIdUseCase(input) {
  try {
    const alreadyExists = await getStockByIdRepository(input);

    if (alreadyExists.length < 0) {
      const error = new Error(
        "Não existe nenhum produto com esse id no estoque."
      );
      error.status = HttpStatus.NOT_FOUND;
      throw error;
    }

    const alreadyByProductExists = await getStockByProductRepository(
      input.fk_product
    );

    if (
      alreadyByProductExists.length > 0 &&
      input.fk_product != alreadyExists.fk_product
    ) {
      const error = new Error("Já existe esse produto no estoque.");
      error.status = HttpStatus.BAD_REQUEST;
      throw error;
    }

    const updatedClient = await updateStockByIdRepository(input);

    return updatedClient;
  } catch (error) {
    const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    throw {
      message: `Erro ao atualizar o cliente: ${error.message}`,
      status: status,
    };
  }
}

module.exports = { updateStockByIdUseCase };
