import { instance } from "../../axios/axios";

export async function bestSellingProduct() {
  const response = await instance.get(`/best-selling-product`);

  return response.data;
}

export async function productLowerStock() {
  const response = await instance.get(`/product-lower-stock`);

  return response.data;
}

export async function getProductPerClient(idClient) {
  const response = await instance.get(`/products-per-client/${idClient}`);

  return response.data;
}

export async function getAverageClientConsumption(idClient) {
  const response = await instance.get(`/get-average-client-consumption/${idClient}`);

  return response.data;
}
