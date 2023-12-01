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
const { HttpStatus } = require("../../util/http-status");

async function deleteClientByIdUseCase(input) {
  try {
    const alreadyExists = await getClientByIdRepository(input);

    if (alreadyExists.length < 0) {
      const error = new Error("Não existe um cliente com esse nome.");
      error.status = HttpStatus.NOT_FOUND;
      throw error;
    }

    const haveBuys = await getSellByClientRepository(input.id);

    if (haveBuys.length > 0) {
      const error = new Error(
        "Esse cliente tem compras vinculadas ao seu usuário, portanto, não é possível remove-lo."
      );
      error.status = HttpStatus.BAD_REQUEST;
      throw error;
    }

    const removeClient = await deleteClientById(input.id);

    return removeClient;
  } catch (error) {
    const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    throw {
      message: `Erro ao apagar um cliente: ${error.message}`,
      status: status,
    };
  }
}

module.exports = { deleteClientByIdUseCase };
