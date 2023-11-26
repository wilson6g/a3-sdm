const { outputClientDto } = require("../../dto/client-dto/output-client-dto");
const {
  createClientRepository,
} = require("../../framework-drivers/database/repository/client-repository/create-client-repository");
const {
  getClientByNameRepository,
} = require("../../framework-drivers/database/repository/client-repository/get-client-by-name-repository");
const { HttpStatus } = require("../../util/http-status");

async function createClientUseCase(client) {
  try {
    const alreadyExists = await getClientByNameRepository(client.name);

    if (alreadyExists.length > 0) {
      const error = new Error("Já existe um cliente com esse nome.");
      error.status = HttpStatus.BAD_REQUEST;
      throw error;
    }

    const newClient = await createClientRepository(client);

    return outputClientDto(newClient);
  } catch (error) {
    const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    throw {
      message: `Erro ao criar um cliente: ${error.message}`,
      status: status,
    };
  }
}

module.exports = { createClientUseCase };
