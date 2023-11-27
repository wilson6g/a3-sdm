const express = require("express");
const stockRoutes = express();
const {
  createStockController,
  deleteStockController,
  getByIdStockController,
  updateStockController,
} = require("../../controller/stock-controller");
const { HttpStatus } = require("../../util/http-status");
const {
  createStockUseCase,
  listAllStockUseCase,
  deleteStockByIdUseCase,
  updateStockByIdUseCase,
} = require("../../useCase/stock-use-case");

stockRoutes.post("/stock", async (request, response) => {
  try {
    const input = request.body;

    const validCreateClientDto = createStockController(input);

    if (!validCreateClientDto) {
      throw {
        message: "Os dados de entrada não são válidos.",
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }

    const output = await createStockUseCase(validCreateClientDto);

    response.status(HttpStatus.CREATED).json(output);
  } catch (error) {
    response.status(error.status).json({
      error: error.message,
    });
  }
});

stockRoutes.get("/stock", async (request, response) => {
  try {
    const output = await listAllStockUseCase();

    response.status(HttpStatus.OK).json(output);
  } catch (error) {
    response.status(error.status).json({
      error: error.message,
    });
  }
});

stockRoutes.get("/stock/:id", async (request, response) => {
  try {
    const input = request.params;

    const validGetStockByIdDto = getByIdStockController(input);

    if (!validGetStockByIdDto) {
      throw {
        message: "Os dados de entrada não são válidos.",
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }

    const output = await getByIdStockUseCase(validGetClientByIdDto);

    response.status(HttpStatus.OK).json(output);
  } catch (error) {
    response.status(error.status).json({
      error: error.message,
    });
  }
});

stockRoutes.put("/stock/:id", async (request, response) => {
  try {
    const input = { ...request.params, ...request.body };

    const validUpdateStockByIdDto = updateStockController(input);

    if (!validUpdateStockByIdDto) {
      throw {
        message: "Os dados de entrada não são válidos.",
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }

    const output = await updateStockByIdUseCase(validUpdateStockByIdDto);

    response.status(HttpStatus.OK).json(output);
  } catch (error) {
    response.status(error.status).json({
      error: error.message,
    });
  }
});

stockRoutes.delete("/stock/:id", async (request, response) => {
  try {
    const input = request.params;

    const validDeleteStockByIdDto = deleteStockController(input);

    if (!validDeleteStockByIdDto) {
      throw {
        message: "Os dados de entrada não são válidos.",
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }

    await deleteStockByIdUseCase(validDeleteStockByIdDto);

    response.status(HttpStatus.NO_CONTENT).json();
  } catch (error) {
    console.log(error);
    response.status(error.status).json({
      error: error.message,
    });
  }
});

module.exports = { stockRoutes };
