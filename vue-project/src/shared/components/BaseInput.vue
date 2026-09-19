<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string
    modelValue?: string | number
    type?: 'text' | 'email' | 'password' | 'number'
    placeholder?: string
    required?: boolean
    disabled?: boolean
  }>(),
  {
    label: '',
    modelValue: '',
    type: 'text',
    placeholder: '',
    required: false,
    disabled: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <label class="field">
    <span v-if="label" class="label">{{ label }}</span>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      @input="onInput"
    />
  </label>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.label {
  color: #334155;
  font-weight: 600;
}

input {
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  padding: 0.75rem 0.85rem;
  background: white;
  color: #0f172a;
}
</style>
