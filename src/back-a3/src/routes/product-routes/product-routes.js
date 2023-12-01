const express = require("express");
const productRoutes = express();
const {
  createProductController,
  deleteProductController,
  getByIdProductController,
  updateProductController,
} = require("../../controller/product-controller");
const { HttpStatus } = require("../../util/http-status");
const {
  createProductUseCase,
  listAllProductUseCase,
} = require("../../useCase/product-use-case");

productRoutes.post("/product", async (request, response) => {
  try {
    const input = request.body;

    const validCreateProductDto = createProductController(input);

    if (!validCreateProductDto) {
      throw {
        message: "Os dados de entrada não são válidos.",
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }

    const output = await createProductUseCase(validCreateProductDto);

    response.status(HttpStatus.CREATED).json(output);
  } catch (error) {
    response.status(error.status).json({
      error: error.message,
    });
  }
});

productRoutes.get("/product", async (request, response) => {
  try {
    const output = await listAllProductUseCase();

    response.status(HttpStatus.OK).json(output);
  } catch (error) {
    response.status(error.status).json({
      error: error.message,
    });
  }
});

productRoutes.get("/product/:id", async (request, response) => {
  try {
    const input = request.params;

    const validGetProductByIdDto = getByIdProductController(input);

    if (!validCreateProductDto) {
      throw {
        message: "Os dados de entrada não são válidos.",
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }

    const output = await getByIdProductUseCase(validGetProductByIdDto);

    response.status(HttpStatus.OK).json(output);
  } catch (error) {
    response.status(error.status).json({
      error: error.message,
    });
  }
});

productRoutes.put("/product/:id", async (request, response) => {
  try {
    const input = { ...request.params, ...request.body };

    const validUpdateProductByIdDto = updateProductController(input);

    if (!validCreateProductDto) {
      throw {
        message: "Os dados de entrada não são válidos.",
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }

    const output = await updateProductByIdUseCase(validUpdateProductByIdDto);

    response.status(HttpStatus.OK).json(output);
  } catch (error) {
    response.status(error.status).json({
      error: error.message,
    });
  }
});

productRoutes.delete("/product/:id", async (request, response) => {
  try {
    const input = request.params;

    const validDeleteProductByIdDto = deleteProductController(input);

    if (!validCreateProductDto) {
      throw {
        message: "Os dados de entrada não são válidos.",
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }

    await deleteProductByIdUseCase(validDeleteProductByIdDto);

    response.status(HttpStatus.NO_CONTENT).json();
  } catch (error) {
    response.status(error.status).json({
      error: error.message,
    });
  }
});

module.exports = { productRoutes };
