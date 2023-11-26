const express = require("express");
const relatoryRoutes = express();

const { HttpStatus } = require("../../util/http-status");
const { productLowerStockUseCase } = require("../../useCase/stock-use-case");
const {
  productsPerClientController,
} = require("../../controller/client-controller");
const {
  getProductsPerClientUseCase,
} = require("../../useCase/client-use-case");
const { bestSellingProductUseCase } = require("../../useCase/sell-use-case");
const {
  generateXlsx,
} = require("../../framework-drivers/libraries/excel-4-node/excel-4-node");

relatoryRoutes.get("/product-lower-stock", async (request, response) => {
  try {
    const productsLowerStock = await productLowerStockUseCase();

    const output = await generateXlsx(
      productsLowerStock,
      ["nome", "valor", "quantidade"],
      "output"
    );

    response.status(HttpStatus.OK).json(output);
  } catch (error) {
    response.status(error.status).json({
      error: error.message,
    });
  }
});

relatoryRoutes.get(
  "/products-per-client/:fk_client",
  async (request, response) => {
    try {
      const input = request.params;

      const validGetClientByIdDto = productsPerClientController(input);

      if (!validGetClientByIdDto) {
        throw {
          message: "Os dados de entrada não são válidos.",
          status: HttpStatus.UNPROCESSABLE_ENTITY,
        };
      }

      const productsPerClient = await getProductsPerClientUseCase(
        validGetClientByIdDto
      );

      const output = await generateXlsx(
        productsPerClient,
        [
          "Nome do produto",
          "Valor por produto",
          "Unidades vendidas",
          "Quantidade de vendas",
          "Valor total",
        ],
        "output"
      );

      response.status(HttpStatus.OK).json(output);
    } catch (error) {
      response.status(error.status).json({
        error: error.message,
      });
    }
  }
);

relatoryRoutes.get("/best-selling-product", async (request, response) => {
  try {
    const bestSellingProducts = await bestSellingProductUseCase();

    const output = await generateXlsx(
      bestSellingProducts,
      [
        "Nome do produto",
        "Valor por produto",
        "Unidades vendidas",
        "Quantidade de vendas",
        "Venda total",
      ],
      "output"
    );

    response.status(HttpStatus.OK).json(output);
  } catch (error) {
    response.status(error.status).json({
      error: error.message,
    });
  }
});

module.exports = { relatoryRoutes };
