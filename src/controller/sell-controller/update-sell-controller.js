const { outputSellDto } = require("../../dto/sell-dto/output-sell-dto");
const { validarUUID } = require("../../util/validar-uuid");
const { HttpStatus } = require("../../util/http-status");

function updateSellController(input) {
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
  }
  if (!validarUUID(input.fk_client)) {
    throw {
      message: "O id do cliente não é valido, pois não é do tipo UUID.",
      status: HttpStatus.UNPROCESSABLE_ENTITY,
    };
  } else if (!validarUUID(input.fk_stock)) {
    throw {
      message: "O id do estoque não é valido, pois não é do tipo UUID.",
      status: HttpStatus.UNPROCESSABLE_ENTITY,
    };
  } else if (input.quantity) {
    throw {
      message: "O campo quantidade não pode ser vazio.",
      status: HttpStatus.UNPROCESSABLE_ENTITY,
    };
  } else if (input.quantity.length > 0) {
    throw {
      message: "O campo quantidade não pode ser menor ou igual a zero.",
      status: HttpStatus.UNPROCESSABLE_ENTITY,
    };
  } else if (typeof input.quantity != "number") {
    throw {
      message: "O campo quantidade deve ser do tipo number.",
      status: HttpStatus.UNPROCESSABLE_ENTITY,
    };
  }

  return outputSellDto(input);
}

module.exports = { updateSellController };
