<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'

import { useProductsStore } from '../stores/productsStore'
import type { ProductFormData } from '../types/product'

const productsStore = useProductsStore()

const form = reactive<ProductFormData>({
  name: '',
  sku: '',
  price: 0,
  stock: 0,
  category: '',
  active: true,
})

const editingId = ref<number | null>(null)
const errorMessage = ref('')
const isDemoMode = !import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_BASE_URL === 'https://api.example.com'

const mockProducts = [
  {
    id: 1,
    name: 'Teclado Mecânico',
    sku: 'TEC-1001',
    price: 499.9,
    stock: 24,
    category: 'Periféricos',
    active: true,
  },
  {
    id: 2,
    name: 'Mouse Sem Fio',
    sku: 'MOU-2002',
    price: 199.9,
    stock: 18,
    category: 'Periféricos',
    active: true,
  },
  {
    id: 3,
    name: 'Monitor 24"',
    sku: 'MON-3003',
    price: 1499,
    stock: 7,
    category: 'Display',
    active: true,
  },
]

onMounted(async () => {
  productsStore.items = mockProducts
})

async function submitForm() {
  if (!form.name || !form.sku) {
    return
  }

  errorMessage.value = ''

  try {
    if (isDemoMode) {
      const product = {
        id: editingId.value ?? Math.max(0, ...productsStore.items.map((item) => item.id)) + 1,
        ...form,
      }

      productsStore.items = editingId.value
        ? productsStore.items.map((item) => (item.id === editingId.value ? product : item))
        : [product, ...productsStore.items]
    } else {
      await productsStore.saveProduct(form, editingId.value ?? undefined)
    }

    resetForm()
  } catch {
    errorMessage.value = 'Não foi possível salvar o produto. Verifique a configuração da API.'
  }
}

function resetForm() {
  editingId.value = null
  form.name = ''
  form.sku = ''
  form.price = 0
  form.stock = 0
  form.category = ''
  form.active = true
}

function editProduct(product: (typeof mockProducts)[number]) {
  editingId.value = product.id
  form.name = product.name
  form.sku = product.sku
  form.price = product.price
  form.stock = product.stock
  form.category = product.category
  form.active = product.active
}

async function removeProduct(id: number) {
  errorMessage.value = ''

  try {
    if (isDemoMode) {
      productsStore.items = productsStore.items.filter((product) => product.id !== id)
    } else {
      await productsStore.removeProduct(id)
    }
  } catch {
    errorMessage.value = 'Não foi possível excluir o produto. Verifique a configuração da API.'
  }
}
</script>

<template>
  <section class="page">
    <header class="topbar">
      <div>
        <p class="eyebrow">Domínio</p>
        <h1>Produtos</h1>
      </div>
      <span class="badge">{{ productsStore.totalProducts }} itens</span>
    </header>

    <div class="summary">
      <article class="card">
        <span>Total de produtos</span>
        <strong>{{ productsStore.totalProducts }}</strong>
      </article>
      <article class="card">
        <span>Estoque total</span>
        <strong>{{ productsStore.stockTotal }}</strong>
      </article>
    </div>

    <div class="content">
      <form class="panel" @submit.prevent="submitForm">
        <h2>{{ editingId ? 'Editar produto' : 'Adicionar produto' }}</h2>
        <p v-if="errorMessage" class="error" role="alert">{{ errorMessage }}</p>

        <label>
          Nome
          <input v-model="form.name" type="text" />
        </label>

        <label>
          SKU
          <input v-model="form.sku" type="text" />
        </label>

        <label>
          Categoria
          <input v-model="form.category" type="text" />
        </label>

        <div class="row">
          <label>
            Preço
            <input v-model.number="form.price" type="number" min="0" step="0.01" />
          </label>

          <label>
            Estoque
            <input v-model.number="form.stock" type="number" min="0" />
          </label>
        </div>

        <label class="checkbox">
          <input v-model="form.active" type="checkbox" />
          Produto ativo
        </label>

        <button type="submit">
          {{ editingId ? 'Salvar alterações' : 'Cadastrar produto' }}
        </button>
      </form>

      <div class="panel table-panel">
        <h2>Lista de produtos</h2>

        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>SKU</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in productsStore.items" :key="product.id">
              <td>{{ product.name }}</td>
              <td>{{ product.sku }}</td>
              <td>{{ product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</td>
              <td>{{ product.stock }}</td>
              <td class="actions">
                <button class="secondary" type="button" @click="editProduct(product)">Editar</button>
                <button class="danger" type="button" @click="removeProduct(product.id)">Excluir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.topbar,
.summary,
.row,
.actions {
  display: flex;
  align-items: center;
}

.topbar,
.summary {
  justify-content: space-between;
}

.eyebrow {
  margin: 0;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.72rem;
}

h1,
h2 {
  margin: 0.2rem 0 0;
  color: #0f172a;
}

.badge {
  background: #dbeafe;
  color: #1d4ed8;
  border-radius: 999px;
  padding: 0.45rem 0.8rem;
  font-weight: 700;
}

.summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}

.card,
.panel {
  background: white;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 14px;
  padding: 1rem;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.card span {
  color: #64748b;
}

.card strong {
  font-size: 1.7rem;
  color: #0f172a;
}

.content {
  display: grid;
  grid-template-columns: minmax(280px, 360px) 1fr;
  gap: 1rem;
}

.panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  color: #334155;
  font-weight: 600;
}

input {
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  padding: 0.75rem 0.85rem;
}

.row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.checkbox {
  flex-direction: row !important;
  align-items: center;
  gap: 0.6rem;
}

button {
  border: 0;
  border-radius: 10px;
  padding: 0.8rem 1rem;
  font-weight: 700;
  cursor: pointer;
}

button[type='submit'] {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
}

.secondary {
  background: #e2e8f0;
  color: #0f172a;
}

.danger {
  background: #fee2e2;
  color: #b91c1c;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.85rem 0.65rem;
  text-align: left;
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
}

th {
  color: #475569;
}

.actions {
  gap: 0.5rem;
}

@media (max-width: 900px) {
  .content {
    grid-template-columns: 1fr;
  }
}
</style>
