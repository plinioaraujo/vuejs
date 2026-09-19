<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import BaseButton from '@/shared/components/BaseButton.vue'
import BaseInput from '@/shared/components/BaseInput.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('admin@boilerplate.com')
const password = ref('123456')
const error = ref('')
const loading = ref(false)

async function handleLogin() {
  loading.value = true
  error.value = ''

  try {
    await authStore.login(email.value, password.value)
    router.push('/')
  } catch {
    error.value = 'Credenciais inválidas ou servidor indisponível.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-shell">
    <div class="login-card">
      <div class="brand">
        <div class="logo">B</div>
        <div>
          <p class="eyebrow">Acesso</p>
          <h1>Business Boilerplate</h1>
        </div>
      </div>

      <form class="form" @submit.prevent="handleLogin">
        <BaseInput v-model="email" label="E-mail" type="email" placeholder="seu@email.com" />

        <BaseInput v-model="password" label="Senha" type="password" placeholder="••••••••" />

        <p v-if="error" class="error">{{ error }}</p>

        <BaseButton type="submit" :disabled="loading">{{ loading ? 'Entrando...' : 'Entrar' }}</BaseButton>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-shell {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #0f172a, #1d4ed8);
}

.login-card {
  width: min(100%, 440px);
  background: rgba(255, 255, 255, 0.96);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 25px 60px rgba(15, 23, 42, 0.25);
}

.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.logo {
  width: 3rem;
  height: 3rem;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  font-weight: 700;
}

.eyebrow {
  margin: 0;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.7rem;
}

h1 {
  margin: 0.2rem 0 0;
  color: #0f172a;
  font-size: 1.5rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: #334155;
  font-weight: 600;
}

input {
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  padding: 0.8rem 0.9rem;
  background: white;
  color: #0f172a;
}

button {
  border: 0;
  border-radius: 10px;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  font-weight: 700;
  padding: 0.9rem 1rem;
  cursor: pointer;
}

.error {
  margin: 0;
  color: #dc2626;
  font-size: 0.9rem;
}
</style>
