const { outputClientDto } = require("../../dto/client-dto/output-client-dto");
const {
  listClientRepository,
} = require("../../framework-drivers/database/repository/client-repository/list-client-repository");

async function listAllClientUseCase() {
  try {
    const clients = await listClientRepository();

    const clientsDto = clients.map((client) => outputClientDto(client));

    return clientsDto;
  } catch (error) {
    const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    throw {
      message: `Erro ao listar os clientes: ${error.message}`,
      status: status,
    };
  }
}

module.exports = { listAllClientUseCase };
