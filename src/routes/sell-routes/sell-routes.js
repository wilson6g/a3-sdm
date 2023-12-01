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
const {
  updateSellByIdUseCase,
} = require("../../useCase/sell-use-case/update-sell-by-id-use-case");
const {
  deleteSellByIdUseCase,
} = require("../../useCase/sell-use-case/delete-sell-by-id-use-case");

sellRoutes.get("/sell", async (request, response) => {
  try {
    const output = await listAllSellUseCase();

    response.status(HttpStatus.OK).json(output);
  } catch (error) {
    console.log("error", error);
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
  try {
    const input = { ...request.params, ...request.body };

    const validUpdateStockByIdDto = updateSellController(input);

    if (!validUpdateStockByIdDto) {
      throw {
        message: "Os dados de entrada não são válidos.",
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }

    const output = await updateSellByIdUseCase(validUpdateStockByIdDto);

    response.status(HttpStatus.OK).json(output);
  } catch (error) {
    console.log(error);
    response.status(error.status).json({
      error: error.message,
    });
  }
});

sellRoutes.delete("/sell/:id", async (request, response) => {
  try {
    const input = request.params;

    const validDeleteStockByIdDto = deleteSellController(input);

    if (!validDeleteStockByIdDto) {
      throw {
        message: "Os dados de entrada não são válidos.",
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }

    await deleteSellByIdUseCase(validDeleteStockByIdDto);

    response.status(HttpStatus.NO_CONTENT).json();
  } catch (error) {
    console.log(error);
    response.status(error.status).json({
      error: error.message,
    });
  }
});

module.exports = { sellRoutes };
