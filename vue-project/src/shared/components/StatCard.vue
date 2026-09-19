<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  trend: {
    type: String,
    default: '',
  },
  tone: {
    type: String as PropType<'primary' | 'success' | 'warning' | 'neutral'>,
    default: 'neutral',
  },
})
</script>

<template>
  <article class="stat-card" :class="`tone-${props.tone}`">
    <span class="label">{{ props.title }}</span>
    <strong class="value">{{ props.value }}</strong>
    <small v-if="props.trend" class="trend">{{ props.trend }}</small>
  </article>
</template>

<style scoped>
.stat-card {
  background: rgba(15, 23, 42, 0.02);
  border: 1px solid rgba(148, 163, 184, 0.15);
  border-radius: 16px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.label {
  color: #64748b;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.value {
  font-size: clamp(1.4rem, 2vw, 2rem);
  color: #0f172a;
}

.trend {
  color: #475569;
}

.tone-primary .value,
.tone-primary .trend {
  color: #315efb;
}

.tone-success .value,
.tone-success .trend {
  color: #15803d;
}

.tone-warning .value,
.tone-warning .trend {
  color: #b45309;
}
</style>
