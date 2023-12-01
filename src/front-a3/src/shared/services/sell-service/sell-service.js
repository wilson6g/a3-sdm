import { instance } from "../../axios/axios";

export async function listSell() {
  const response = await instance.get(`/sell`);

  return response.data;
}

export async function createSell(input) {
  const response = await instance.post(`/sell`, input);

  return response.data;
}

export async function deleteSell(input) {
  const response = await instance.delete(`/sell/${input.id}`);

  return response.data;
}

export async function updateSell(input) {
  const formattedInput = {
    id: input.id,
    quantity: parseInt(input.orderProductQuantity),
    fk_client: input.fk_client,
    fk_stock: input.fk_stock,
  };

  const response = await instance.put(
    `/sell/${formattedInput.id}`,
    formattedInput
  );

  return response.data;
}
