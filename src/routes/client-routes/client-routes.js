const express = require("express");
const clientRoutes = express();
const {
  createClientController,
  deleteClientController,
  getByIdClientController,
  updateClientController,
} = require("../../controller/client-controller");
const {
  createClientUseCase,
  listAllClientUseCase,
} = require("../../useCase/client-use-case");
const { HttpStatus } = require("../../util/http-status");
const {
  deleteClientByIdUseCase,
} = require("../../useCase/client-use-case/delete-client-by-id-use-case");
const {
  updateClientByIdUseCase,
} = require("../../useCase/client-use-case/update-client-by-id-use-case");

clientRoutes.post("/client", async (request, response) => {
  try {
    const input = request.body;

    const validCreateClientDto = createClientController(input);

    if (!validCreateClientDto) {
      throw {
        message: "Os dados de entrada não são válidos.",
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }

    const output = await createClientUseCase(validCreateClientDto);

    response.status(HttpStatus.CREATED).json(output);
  } catch (error) {
    response.status(error.status).json({
      error: error.message,
    });
  }
});

clientRoutes.get("/client", async (request, response) => {
  try {
    const output = await listAllClientUseCase();

    response.status(HttpStatus.OK).json(output);
  } catch (error) {
    response.status(error.status).json({
      error: error.message,
    });
  }
});

clientRoutes.get("/client/:id", async (request, response) => {
  try {
    const input = request.params;

    const validGetClientByIdDto = getByIdClientController(input);

    if (!validCreateClientDto) {
      throw {
        message: "Os dados de entrada não são válidos.",
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }

    const output = await getByIdClientUseCase(validGetClientByIdDto);

    response.status(HttpStatus.OK).json(output);
  } catch (error) {
    response.status(error.status).json({
      error: error.message,
    });
  }
});

clientRoutes.put("/client/:id", async (request, response) => {
  try {
    const input = { ...request.params, ...request.body };

    const validUpdateClientByIdDto = updateClientController(input);

    if (!validUpdateClientByIdDto) {
      throw {
        message: "Os dados de entrada não são válidos.",
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }

    const output = await updateClientByIdUseCase(validUpdateClientByIdDto);

    response.status(HttpStatus.OK).json(output);
  } catch (error) {
    response.status(error.status).json({
      error: error.message,
    });
  }
});

clientRoutes.delete("/client/:id", async (request, response) => {
  try {
    const input = request.params;

    const validDeleteClientByIdDto = deleteClientController(input);

    if (!validDeleteClientByIdDto) {
      throw {
        message: "Os dados de entrada não são válidos.",
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }

    await deleteClientByIdUseCase(validDeleteClientByIdDto);

    response.status(HttpStatus.NO_CONTENT).json();
  } catch (error) {
    response.status(error.status).json({
      error: error.message,
    });
  }
});

module.exports = { clientRoutes };
