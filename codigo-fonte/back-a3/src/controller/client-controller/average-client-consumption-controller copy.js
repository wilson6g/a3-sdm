const { validarUUID } = require("../../util/validar-uuid");
const { HttpStatus } = require("../../util/http-status");

function averageClientConsumptionController(input) {
  if (Object.keys(input).length < 0) {
    throw {
      message: "Não foi recebido nenhum campo.",
      status: HttpStatus.UNPROCESSABLE_ENTITY,
    };
  } else if (!validarUUID(input.fk_client)) {
    throw {
      message: "O id do cliente não é valido, pois não é do tipo UUID.",
      status: HttpStatus.UNPROCESSABLE_ENTITY,
    };
  }

  return {
    fk_client: input.fk_client,
  };
}

module.exports = { averageClientConsumptionController };
