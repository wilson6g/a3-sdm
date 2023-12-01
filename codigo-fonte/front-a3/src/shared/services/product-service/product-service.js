import { instance } from "../../axios/axios";

export async function listProduct() {
  const response = await instance.get(`/product`);

  return response.data;
}

export async function createProduct(input) {
  const response = await instance.post(`/product`, input);

  return response.data;
}

export async function deleteProduct(input) {
  const response = await instance.delete(`/product/${input.id}`);

  return response.data;
}

export async function updateProduct(input) {
  const response = await instance.put(`/product/${input.id}`, input);

  return response.data;
}
