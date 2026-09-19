export interface Product {
  id: number
  name: string
  sku: string
  price: number
  stock: number
  category: string
  active: boolean
}

export interface ProductFormData {
  name: string
  sku: string
  price: number
  stock: number
  category: string
  active: boolean
}
