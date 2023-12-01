import { instance } from "../../axios/axios";

export async function listStock() {
  const response = await instance.get(`/Stock`);

  return response.data;
}

export async function createStock(input) {
  const response = await instance.post(`/stock`, input);

  return response.data;
}

export async function deleteStock(input) {
  const response = await instance.delete(`/stock/${input.id}`);

  return response.data;
}

export async function updateStock(input) {
  input.quantity = parseInt(input.quantity);

  const response = await instance.put(`/stock/${input.id}`, input);

  return response.data;
}
