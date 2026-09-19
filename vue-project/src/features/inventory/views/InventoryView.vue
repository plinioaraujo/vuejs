<script setup lang="ts">
const inventory = [
  { sku: 'SKU-001', item: 'Teclado mecânico', stock: 120, status: 'Disponível' },
  { sku: 'SKU-023', item: 'Mouse sem fio', stock: 34, status: 'Baixo' },
  { sku: 'SKU-045', item: 'Monitor 24"', stock: 8, status: 'Crítico' },
]
</script>

<template>
  <section>
    <h1>Estoque</h1>
    <table>
      <thead>
        <tr>
          <th>SKU</th>
          <th>Produto</th>
          <th>Quantidade</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in inventory" :key="item.sku">
          <td>{{ item.sku }}</td>
          <td>{{ item.item }}</td>
          <td>{{ item.stock }}</td>
          <td>{{ item.status }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

h1 {
  margin: 0;
  color: #0f172a;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
}

th,
td {
  text-align: left;
  padding: 0.9rem 1rem;
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
}

th {
  background: rgba(148, 163, 184, 0.08);
  color: #334155;
}
</style>
