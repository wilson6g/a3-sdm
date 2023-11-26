const {
  getStockByIdRepository,
} = require("../../framework-drivers/database/repository/stock-repository/get-stock-by-id-repository");
const {
  updateStockRepository,
} = require("../../framework-drivers/database/repository/stock-repository/update-stock-repository");
const { HttpStatus } = require("../../util/http-status");

async function buyProductUseCase(order) {
  try {
    const stockItem = await getStockByIdRepository(order.fk_stock);

    if (!stockItem) {
      const error = new Error("Não existe esse produto no estoque.");
      error.status = HttpStatus.NOT_FOUND;
      throw error;
    }

    if (stockItem.quantity >= order.quantity) {
      const newStockItemQuantity = stockItem.quantity - order.quantity;

      const stockItemRequestUpdate = {
        quantity: newStockItemQuantity,
        fk_product: stockItem.fk_product,
        id: order.fk_stock,
      };

      await updateStockRepository(stockItemRequestUpdate);
    } else if (stockItem.quantity <= order.quantity) {
      const error = new Error(
        "Esse produto não está mais disponível em estoque."
      );
      error.status = HttpStatus.BAD_REQUEST;
      throw error;
    }

    const itemTotal = parseFloat(stockItem.product_value) * order.quantity;

    const updatedStockItem = {
      ...order,
      value: itemTotal,
    };

    return updatedStockItem;
  } catch (error) {
    const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    throw {
      message: `${error.message}`,
      status: status,
    };
  }
}

module.exports = { buyProductUseCase };
