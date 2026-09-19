<script setup lang="ts">
const customers = [
  { name: 'Maria Silva', status: 'Ativo', value: 'R$ 12.400' },
  { name: 'João Pereira', status: 'Em análise', value: 'R$ 4.800' },
  { name: 'Ana Costa', status: 'Ativo', value: 'R$ 9.150' },
]
</script>

<template>
  <section>
    <h1>Clientes</h1>
    <div class="list">
      <article v-for="customer in customers" :key="customer.name" class="card">
        <strong>{{ customer.name }}</strong>
        <span>{{ customer.status }}</span>
        <em>{{ customer.value }}</em>
      </article>
    </div>
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

.list {
  display: grid;
  gap: 1rem;
}

.card {
  background: #fff;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

span {
  color: #64748b;
}

em {
  font-style: normal;
  color: #0f172a;
  font-weight: 700;
}
</style>
