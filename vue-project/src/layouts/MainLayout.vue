<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

const navItems = [
  { label: 'Dashboard', to: '/', icon: '⌂' },
  { label: 'Produtos', to: '/products', icon: '📦' },
  { label: 'Clientes', to: '/customers', icon: '👥' },
  { label: 'Estoque', to: '/inventory', icon: '📦' },
  { label: 'Financeiro', to: '/finance', icon: '💰' },
  { label: 'Configurações', to: '/settings', icon: '⚙️' },
]
</script>

<template>
  <div class="app-shell" :class="{ 'theme-dark': appStore.darkMode }">
    <aside class="sidebar">
      <div class="brand-block">
        <div class="logo">B</div>
        <div>
          <strong>{{ appStore.appName }}</strong>
          <small>Boilerplate</small>
        </div>
      </div>

      <nav class="nav">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-link"
        >
          <span>{{ item.icon }}</span>
          {{ item.label }}
        </RouterLink>
      </nav>

      <button class="theme-toggle" @click="appStore.toggleTheme()">
        {{ appStore.darkMode ? 'Tema claro' : 'Tema escuro' }}
      </button>
    </aside>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
  background: #f8fafc;
  color: #0f172a;
}

.theme-dark {
  background: #020817;
  color: #e2e8f0;
}

.sidebar {
  background: rgba(15, 23, 42, 0.96);
  color: white;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
}

.logo {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  display: grid;
  place-items: center;
  font-weight: 700;
}

.brand-block small {
  display: block;
  color: rgba(255, 255, 255, 0.7);
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.8rem 0.9rem;
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: 0.2s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  background: rgba(59, 130, 246, 0.18);
  color: #fff;
}

.theme-toggle {
  margin-top: auto;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: transparent;
  color: white;
  padding: 0.8rem 1rem;
  border-radius: 10px;
  cursor: pointer;
}

.content {
  padding: 2rem;
}

@media (max-width: 768px) {
  .app-shell {
    grid-template-columns: 1fr;
  }

  .sidebar {
    padding-bottom: 1rem;
  }
}
</style>
