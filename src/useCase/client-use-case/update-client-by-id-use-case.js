const {
  getClientByIdRepository,
} = require("../../framework-drivers/database/repository/client-repository/get-client-by-id-repository");
const {
  updateClientByIdRepository,
} = require("../../framework-drivers/database/repository/client-repository/update-client-by-id-repository");
const { HttpStatus } = require("../../util/http-status");

async function updateClientByIdUseCase(input) {
  try {
    const alreadyExists = await getClientByIdRepository(input);

    if (alreadyExists.length < 0) {
      const error = new Error("Não existe um cliente com esse nome.");
      error.status = HttpStatus.NOT_FOUND;
      throw error;
    }

    const updatedClient = await updateClientByIdRepository(input);

    return updatedClient;
  } catch (error) {
    const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    throw {
      message: `Erro ao atualizar o cliente: ${error.message}`,
      status: status,
    };
  }
}

module.exports = { updateClientByIdUseCase };
