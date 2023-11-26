const express = require("express");
const sellRoutes = express();

const {
  createSellController,
  deleteSellController,
  getByIdSellController,
  updateSellController,
} = require("../../controller/sell-controller");
const { HttpStatus } = require("../../util/http-status");
const {
  createSellUseCase,
  listAllSellUseCase,
  bestSellingProductUseCase,
} = require("../../useCase/sell-use-case");

sellRoutes.get("/sell", async (request, response) => {
  try {
    const output = await listAllSellUseCase();

    response.status(HttpStatus.OK).json(output);
  } catch (error) {
    console.log('error', error);
    response.status(error.status).json({
      error: error.message,
    });
  }
});



sellRoutes.get("/sell/:id", async (request, response) => {
  response.status(HttpStatus.OK).send("Hello world");
});

sellRoutes.post("/sell", async (request, response) => {
  try {
    const input = request.body;

    const validCreateOrderDto = createSellController(input);

    if (!validCreateOrderDto) {
      throw {
        message: "Os dados de entrada não são válidos.",
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }

    const output = await createSellUseCase(validCreateOrderDto);

    response.status(HttpStatus.CREATED).json(output);
  } catch (error) {
    response.status(error.status).json({
      error: error.message,
    });
  }
});

sellRoutes.put("/sell/:id", async (request, response) => {
  response.status(HttpStatus.OK).send("Hello world");
});

sellRoutes.delete("/sell/:id", async (request, response) => {
  response.status(HttpStatus.OK).send("Hello world");
});

module.exports = { sellRoutes };
