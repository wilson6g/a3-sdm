const { outputSellDto } = require("../../dto/sell-dto/output-sell-dto");
const {
  listSellRepository,
} = require("../../framework-drivers/database/repository/sell-repository/list-sell-repository");
const { HttpStatus } = require("../../util/http-status");

async function bestSellingProductUseCase() {
  try {
    const orders = await listSellRepository();

    if (orders.length == 0) {
      const error = new Error(
        "Não é possível listar os produtos mais vendidos, pois ainda não foi vendido nenhum produto."
      );
      error.status = HttpStatus.BAD_REQUEST;
      throw error;
    }

    const sellsDto = orders.map((item) => outputSellDto(item));

    const bestSellingProducts = sellsDto.reduce((accumulator, currentValue) => {
      if (!accumulator[currentValue.product_name]) {
        accumulator[currentValue.product_name] = {
          orderRequests: 1,
          product_name: currentValue.product_name,
          totalSale: currentValue.totalOrder,
          product_value: currentValue.product_value,
          orderProductQuantity: currentValue.orderProductQuantity,
        };
      } else {
        accumulator[currentValue.product_name].orderRequests += 1;
        accumulator[currentValue.product_name].totalSale +=
          currentValue.totalOrder;
        accumulator[currentValue.product_name].orderProductQuantity +=
          currentValue.orderProductQuantity;
      }

      return accumulator;
    }, {});

    const orderBestSellingProducts = Object.values(bestSellingProducts).sort(
      (a, b) => b.orderRequests - a.orderRequests
    );

    const excludeFields = orderBestSellingProducts.map((product) => ({
      "Nome do Produto": product.product_name,
      "Valor por produto": product.product_value,
      "Unidades vendidas": product.orderProductQuantity,
      "Quantidade de vendas": product.orderRequests,
      "Venda total": product.totalSale.toFixed(2),
    }));

    return excludeFields;
  } catch (error) {
    const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    throw {
      message: `Erro ao listar os produtos mais vendidos: ${error.message}`,
      status: status,
    };
  }
}

module.exports = { bestSellingProductUseCase };
