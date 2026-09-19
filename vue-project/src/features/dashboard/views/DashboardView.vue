<script setup lang="ts">
import StatCard from '@/shared/components/StatCard.vue'
import { formatMoney, formatNumber } from '@/core/utils/formatters'

type MetricTone = 'primary' | 'success' | 'warning' | 'neutral'

const metrics: Array<{
  title: string
  value: string
  trend: string
  tone: MetricTone
}> = [
  { title: 'Receita', value: formatMoney(185420), trend: '+12.4% vs. mês anterior', tone: 'primary' },
  { title: 'Pedidos', value: formatNumber(482), trend: '+8.1% este mês', tone: 'success' },
  { title: 'Estoque crítico', value: '23 itens', trend: '6 precisam atenção', tone: 'warning' },
  { title: 'Clientes ativos', value: '1.280', trend: '+5.6% no trimestre', tone: 'neutral' },
]
</script>

<template>
  <section class="dashboard-view">
    <header class="header">
      <div>
        <p class="eyebrow">Visão geral</p>
        <h1>Dashboard</h1>
      </div>
      <button class="primary-btn">Exportar relatório</button>
    </header>

    <div class="metrics-grid">
      <StatCard
        v-for="metric in metrics"
        :key="metric.title"
        :title="metric.title"
        :value="metric.value"
        :trend="metric.trend"
        :tone="metric.tone"
      />
    </div>
  </section>
</template>

<style scoped>
.dashboard-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.eyebrow {
  margin: 0;
  color: #64748b;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

h1 {
  margin: 0.25rem 0 0;
  color: #0f172a;
  font-size: clamp(1.8rem, 3vw, 2.5rem);
}

.primary-btn {
  border: 0;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  padding: 0.8rem 1.1rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}
</style>
