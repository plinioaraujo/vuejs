import { createCrudService } from '@/core/crud/createCrudService'
import { createProduct, deleteProduct, getProducts, updateProduct } from '../api/productsApi'
import type { Product, ProductFormData } from '../types/product'

export const productsService = createCrudService<Product, ProductFormData, ProductFormData>({
  list: getProducts,
  getById: async (id: number | string) => {
    const all = await getProducts()
    return all.find((product) => product.id === Number(id)) as Product
  },
  create: createProduct,
  update: async (id: number | string, payload: ProductFormData) => updateProduct(Number(id), payload),
  remove: async (id: number | string) => deleteProduct(Number(id)),
})
