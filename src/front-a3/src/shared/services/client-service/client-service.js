import { instance } from "../../axios/axios";

export async function listClient() {
  const response = await instance.get(`/client`);

  return response.data;
}

export async function createClient(input) {
  const response = await instance.post(`/client`, input);

  return response.data;
}

export async function deleteClient(input) {
  const response = await instance.delete(`/client/${input.id}`);

  return response.data;
}

export async function updateClient(input) {
  const response = await instance.put(`/client/${input.id}`, input);

  return response.data;
}
