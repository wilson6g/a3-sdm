const { inputStockDto } = require("../../dto/stock-dto/input-stock-dto");
const { validarUUID } = require("../../util/validar-uuid");
const { HttpStatus } = require("../../util/http-status");

function createStockController(input) {
  if (Object.keys(input).length < 0) {
    throw {
      message: "Não foi recebido nenhum campo.",
      status: HttpStatus.UNPROCESSABLE_ENTITY,
    };
  } else if (!validarUUID(input.fk_product)) {
    throw {
      message: "O id do produto não é valido, pois não é do tipo UUID.",
      status: HttpStatus.UNPROCESSABLE_ENTITY,
    };
  } else if (!input.quantity) {
    throw {
      message: "O campo quantidade não pode ser vazio.",
      status: HttpStatus.UNPROCESSABLE_ENTITY,
    };
  } else if (input.quantity <= 0) {
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

  return inputStockDto(input);
}

module.exports = { createStockController };
