<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'danger'
    type?: 'button' | 'submit'
    disabled?: boolean
  }>(),
  {
    variant: 'primary',
    type: 'button',
    disabled: false,
  },
)
</script>

<template>
  <button :type="type" :disabled="disabled" :class="`variant-${variant}`">
    <slot />
  </button>
</template>

<style scoped>
button {
  border: 0;
  border-radius: 10px;
  padding: 0.8rem 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.variant-primary {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
}

.variant-secondary {
  background: #e2e8f0;
  color: #0f172a;
}

.variant-danger {
  background: #fee2e2;
  color: #b91c1c;
}
</style>
