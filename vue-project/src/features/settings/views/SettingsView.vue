<script setup lang="ts">
const settings = [
  'Configurações gerais',
  'Usuários e permissões',
  'Notificações',
  'Integrações',
]
</script>

<template>
  <section>
    <h1>Configurações</h1>
    <ul>
      <li v-for="item in settings" :key="item">{{ item }}</li>
    </ul>
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

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.75rem;
}

li {
  background: #f8fafc;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 10px;
  padding: 0.85rem 1rem;
}
</style>
