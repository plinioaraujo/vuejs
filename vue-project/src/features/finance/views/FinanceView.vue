<script setup lang="ts">
const bills = [
  { title: 'Salários', value: 'R$ 18.500', due: 'Hoje' },
  { title: 'Fornecedores', value: 'R$ 9.200', due: 'Em 3 dias' },
  { title: 'Investimentos', value: 'R$ 22.000', due: 'Em 10 dias' },
]
</script>

<template>
  <section>
    <h1>Financeiro</h1>
    <div class="cards">
      <article v-for="bill in bills" :key="bill.title" class="card">
        <span>{{ bill.title }}</span>
        <strong>{{ bill.value }}</strong>
        <small>{{ bill.due }}</small>
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

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}

.card {
  background: linear-gradient(135deg, #eff6ff, #ffffff);
  border: 1px solid rgba(96, 165, 250, 0.2);
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

span,
small {
  color: #64748b;
}

strong {
  color: #0f172a;
  font-size: 1.3rem;
}
</style>
