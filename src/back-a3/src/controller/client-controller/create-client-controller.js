const { inputClientDto } = require("../../dto/client-dto/input-client-dto");
const { HttpStatus } = require("../../util/http-status");

function createClientController(input) {
  if (Object.keys(input).length < 0) {
    throw {
      message: "Não foi recebido nenhum campo.",
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

  return inputClientDto(input);
}

module.exports = { createClientController };
