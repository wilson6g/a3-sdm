const { outputSellDto } = require("../../dto/sell-dto/output-sell-dto");
const {
  getSellByClientRepository,
} = require("../../framework-drivers/database/repository/sell-repository/get-sell-by-client-repository");
const {
  listSellRepository,
} = require("../../framework-drivers/database/repository/sell-repository/list-sell-repository");
const { HttpStatus } = require("../../util/http-status");

async function getProductsPerClientUseCase(input) {
  try {
    const orders = await getSellByClientRepository(input.fk_client);

    if (orders.length == 0) {
      const error = new Error(
        "Não é possível listar os produtos desse cliente, pois ainda não foi vendido nenhum produto pra esse cliente."
      );
      error.status = HttpStatus.BAD_REQUEST;
      throw error;
    }

    const sellsDto = orders.map((item) => outputSellDto(item));

    const bestSellingProducts = sellsDto.reduce((accumulator, currentValue) => {
      const clientName = currentValue.client_name;
      const productName = currentValue.product_name;

      if (!accumulator[clientName]) {
        accumulator[clientName] = [];
      }

      const existingProduct = accumulator[clientName].find(
        (product) => product.product_name === productName
      );

      if (!existingProduct) {
        accumulator[clientName].push({
          orderRequests: 1,
          totalSale: currentValue.totalOrder,
          product_name: productName,
          product_value: currentValue.product_value,
          orderProductQuantity: currentValue.orderProductQuantity,
        });
      } else {
        existingProduct.orderRequests += 1;
        existingProduct.totalSale += currentValue.totalOrder;
        existingProduct.orderProductQuantity +=
          currentValue.orderProductQuantity;
      }

      return accumulator;
    }, {});

    const bestSellingProductsArray = Object.values(bestSellingProducts).flat();

    const orderBestSellingProducts = bestSellingProductsArray.sort(
      (a, b) => b.orderRequests - a.orderRequests
    );

    const extractFields = orderBestSellingProducts.map(
      (bestSellingProduct) => ({
        "Nome do produto": bestSellingProduct.product_name,
        "Valor por produto": bestSellingProduct.product_value,
        "Unidades vendidas": bestSellingProduct.orderProductQuantity,
        "Quantidade de vendas": bestSellingProduct.orderRequests,
        "Valor total": bestSellingProduct.totalSale.toFixed(2),
      })
    );

    return extractFields;
  } catch (error) {
    const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    throw {
      message: `Erro ao listar os produtos por cliente: ${error.message}`,
      status: status,
    };
  }
}

module.exports = { getProductsPerClientUseCase };
