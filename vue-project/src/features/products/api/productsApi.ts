import { http } from '@/core/api/http'

import type { Product, ProductFormData } from '../types/product'

export async function getProducts(): Promise<Product[]> {
  const response = await http.get<Product[]>('/products')
  return response.data
}

export async function createProduct(payload: ProductFormData): Promise<Product> {
  const response = await http.post<Product>('/products', payload)
  return response.data
}

export async function updateProduct(id: number, payload: ProductFormData): Promise<Product> {
  const response = await http.put<Product>(`/products/${id}`, payload)
  return response.data
}

export async function deleteProduct(id: number): Promise<void> {
  await http.delete(`/products/${id}`)
}
