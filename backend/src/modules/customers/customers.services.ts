import type { CustomerData } from "@shared/types/customers.js";

import * as repository from "./customers.repository.js";

export async function getAll() {
  const customers = await repository.findAll();
  return customers;
}

export async function getById(id: string) {
  const customer = await repository.findById(id);
  return customer;
}

export async function create(customerData: CustomerData) {
  const customer = await repository.create(customerData);
  return customer;
}

export async function update(id: string, customerData: CustomerData) {
  const customer = await repository.update(id, customerData);
  return customer;
}

export async function remove(id: string) {
  await repository.remove(id);
}
