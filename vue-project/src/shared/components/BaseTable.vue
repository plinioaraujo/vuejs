<script setup lang="ts" generic="T extends Record<string, any>">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    columns: Array<{ key: keyof T; label: string; formatter?: (value: T[keyof T]) => string }>
    rows: T[]
    emptyText?: string
  }>(),
  {
    emptyText: 'Nenhum registro encontrado.',
  },
)

const hasRows = computed(() => props.rows.length > 0)
</script>

<template>
  <div class="table-wrapper">
    <table v-if="hasRows">
      <thead>
        <tr>
          <th v-for="column in columns" :key="String(column.key)">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index">
          <td v-for="column in columns" :key="String(column.key)">
            {{ column.formatter ? column.formatter(row[column.key]) : row[column.key] }}
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else class="empty-state">{{ emptyText }}</p>
  </div>
</template>

<style scoped>
.table-wrapper {
  overflow-x: auto;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 12px;
  background: white;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.85rem 1rem;
  text-align: left;
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
}

th {
  background: #f8fafc;
  color: #475569;
}

.empty-state {
  margin: 0;
  padding: 1rem;
  color: #64748b;
}
</style>
