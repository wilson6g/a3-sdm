const {
  outputProductDto,
} = require("../../dto/product-dto/output-product-dto");
const {
  listProductRepository,
} = require("../../framework-drivers/database/repository/product-repository/list-product-repository");

async function listAllProductUseCase() {
  try {
    const products = await listProductRepository();

    const productsDto = products.map((product) => outputProductDto(product));

    return productsDto;
  } catch (error) {
    throw new Error(`Erro ao listar os produtos: ${error.message}`);
  }
}

module.exports = { listAllProductUseCase };
