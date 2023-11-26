const {
  outputProductDto,
} = require("../../dto/product-dto/output-product-dto");
const {
  createProductRepository,
} = require("../../framework-drivers/database/repository/product-repository/create-product-repository");
const {
  getProductByNameRepository,
} = require("../../framework-drivers/database/repository/product-repository/get-product-by-name-repository");
const { HttpStatus } = require("../../util/http-status");

async function createProductUseCase(product) {
  try {
    const alreadyExists = await getProductByNameRepository(product.name);

    if (alreadyExists.length > 0) {
      const error = new Error("Já existe um produto com esse nome.");
      error.status = HttpStatus.BAD_REQUEST;
      throw error;
    }

    const newProduct = await createProductRepository(product);

    return outputProductDto(newProduct);
  } catch (error) {
    const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    throw {
      message: `Erro ao criar o produto: ${error.message}`,
      status: status,
    };
  }
}

module.exports = { createProductUseCase };
