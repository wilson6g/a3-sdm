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
  productLowerStockUseCase,
} = require("../../useCase/stock-use-case");

// stockRoutes.get("/product-lower-stock", async (request, response) => {
//   try {
//     const output = await productLowerStockUseCase();

//     response.status(HttpStatus.OK).json(output);
//   } catch (error) {
//     console.log(error);
//     response.status(error.status).json({
//       error: error.message,
//     });
//   }
// });

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
  response.status(HttpStatus.OK).send("Hello world");
});

stockRoutes.put("/stock/:id", async (request, response) => {
  response.status(HttpStatus.OK).send("Hello world");
});

stockRoutes.delete("/stock/:id", async (request, response) => {
  response.status(HttpStatus.OK).send("Hello world");
});

module.exports = { stockRoutes };
