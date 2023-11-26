const { outputClientDto } = require("../../dto/client-dto/output-client-dto");
const { validarUUID } = require("../../util/validar-uuid");
const { HttpStatus } = require("../../util/http-status");

function updateClientController(input) {
  if (Object.keys(input).length < 0) {
    throw {
      message: "Não foi recebido nenhum campo.",
      status: HttpStatus.UNPROCESSABLE_ENTITY,
    };
  } else if (!validarUUID(input.id)) {
    throw {
      message: "O id não é valido, pois não é do tipo UUID.",
      status: HttpStatus.UNPROCESSABLE_ENTITY,
    };
  } else if (input.name.length == 0) {
    throw {
      message: "O campo nome não pode ser vazio.",
      status: HttpStatus.UNPROCESSABLE_ENTITY,
    };
  } else if (input.name.length > 14) {
    throw {
      message: "O campo nome não pode ter mais que 14 caracteres.",
      status: HttpStatus.UNPROCESSABLE_ENTITY,
    };
  } else if (typeof input.name != "string") {
    throw {
      message: "O campo nome deve ser do tipo string.",
      status: HttpStatus.UNPROCESSABLE_ENTITY,
    };
  }

  return outputClientDto(input);
}

module.exports = { updateClientController };
