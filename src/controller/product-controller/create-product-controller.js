const { inputProductDto } = require("../../dto/product-dto/input-product-dto");
const { HttpStatus } = require("../../util/http-status");

function createProductController(input) {
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
  } else if (!input.value) {
    throw {
      message: "O campo valor não pode ser vazio.",
      status: HttpStatus.UNPROCESSABLE_ENTITY,
    };
  } else if (input.value <= 0) {
    throw {
      message: "O campo valor não pode ser menor ou igual a zero.",
      status: HttpStatus.UNPROCESSABLE_ENTITY,
    };
  } else if (typeof input.value != "number") {
    throw {
      message: "O campo valor deve ser do tipo number.",
      status: HttpStatus.UNPROCESSABLE_ENTITY,
    };
  }

  return inputProductDto(input);
}

module.exports = { createProductController };
