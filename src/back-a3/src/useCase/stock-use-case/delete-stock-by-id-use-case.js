const {
  getByIdClientController,
  deleteClientController,
} = require("../../controller/client-controller");
const {
  deleteClientById,
} = require("../../framework-drivers/database/repository/client-repository/delete-client-by-id-repository");
const {
  getClientByIdRepository,
} = require("../../framework-drivers/database/repository/client-repository/get-client-by-id-repository");
const {
  getSellByClientRepository,
} = require("../../framework-drivers/database/repository/sell-repository/get-sell-by-client-repository");
const {
  getSellByStockRepository,
} = require("../../framework-drivers/database/repository/sell-repository/get-sell-by-stock-repository");
const {
  deleteStockById,
  deleteStockByIdRepository,
} = require("../../framework-drivers/database/repository/stock-repository/delete-stock-by-id-repository");
const {
  getStockByIdRepository,
} = require("../../framework-drivers/database/repository/stock-repository/get-stock-by-id-repository");
const { HttpStatus } = require("../../util/http-status");

async function deleteStockByIdUseCase(input) {
  try {
    const alreadyExists = await getStockByIdRepository(input);

    if (alreadyExists.length < 0) {
      const error = new Error("Esse produto não está no estoque.");
      error.status = HttpStatus.NOT_FOUND;
      throw error;
    }

    const haveBuys = await getSellByStockRepository(input);

    if (haveBuys.length > 0) {
      const error = new Error(
        "Esse produto tem compras vinculadas a um usuário, portanto, não é possível remove-lo."
      );
      error.status = HttpStatus.BAD_REQUEST;
      throw error;
    }

    const removeStock = await deleteStockByIdRepository(input.id);

    return removeStock;
  } catch (error) {
    const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    throw {
      message: `Erro ao retirar um produto do estoque: ${error.message}`,
      status: status,
    };
  }
}

module.exports = { deleteStockByIdUseCase };
