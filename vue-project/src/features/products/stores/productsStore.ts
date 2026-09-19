import { defineStore } from 'pinia'
import { computed } from 'vue'

import { useCrud } from '@/core/composables/useCrud'

import { productsService } from '../services/productsService'
import type { Product, ProductFormData } from '../types/product'

export const useProductsStore = defineStore('products', () => {
  const { items, loading, fetchAll, create, updateById, removeById } = useCrud<
    Product,
    ProductFormData,
    ProductFormData
  >(productsService)

  const totalProducts = computed(() => items.value.length)
  const stockTotal = computed(() =>
    items.value.reduce((sum, product) => sum + product.stock, 0),
  )

  async function loadProducts() {
    await fetchAll()
  }

  async function saveProduct(payload: ProductFormData, productId?: number) {
    if (productId) {
      return updateById(productId, payload)
    }

    return create(payload)
  }

  async function removeProduct(id: number) {
    await removeById(id)
  }

  return {
    items,
    loading,
    totalProducts,
    stockTotal,
    loadProducts,
    saveProduct,
    removeProduct,
  }
})
