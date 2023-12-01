const { outputSellDto } = require("../../dto/sell-dto/output-sell-dto");
const {
  getSellByClientRepository,
} = require("../../framework-drivers/database/repository/sell-repository/get-sell-by-client-repository");
const { HttpStatus } = require("../../util/http-status");
const moment = require("moment");

async function getAverageClientConsumptionUseCase(input) {
  try {
    const daysOfMonth = moment().daysInMonth();
    const orders = await getSellByClientRepository(input.fk_client);

    if (orders.length == 0) {
      const error = new Error(
        "Não é possível calcular o consumo médio desse cliente, pois ainda não foi vendido nenhum produto para esse cliente."
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
          client_name: clientName,
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

    const consumptionByClient = orderBestSellingProducts.reduce(
      (acc, product) => {
        const clientName = product.client_name;
        if (!acc[clientName]) {
          acc[clientName] = {
            totalSales: 0,
            totalOrders: 0,
          };
        }
        acc[clientName].totalSales += product.totalSale;
        acc[clientName].totalOrders += product.orderRequests;
        return acc;
      },
      {}
    );

    const averageConsumption = Object.keys(consumptionByClient).map(
      (client) => ({
        client: client,
        averageConsumption: (
          consumptionByClient[client].totalOrders / daysOfMonth
        ).toFixed(2),
        averageSpent: (
          consumptionByClient[client].totalSales /
          consumptionByClient[client].totalOrders
        ).toFixed(2),
      })
    );

    return Object.values(averageConsumption);
  } catch (error) {
    const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    throw {
      message: `Erro ao listar os produtos por cliente: ${error.message}`,
      status: status,
    };
  }
}

module.exports = { getAverageClientConsumptionUseCase };
