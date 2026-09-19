import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/features/auth/views/LoginView.vue'
import CustomersView from '@/features/customers/views/CustomersView.vue'
import DashboardView from '@/features/dashboard/views/DashboardView.vue'
import FinanceView from '@/features/finance/views/FinanceView.vue'
import InventoryView from '@/features/inventory/views/InventoryView.vue'
import ProductsView from '@/features/products/views/ProductsView.vue'
import SettingsView from '@/features/settings/views/SettingsView.vue'
import { appPermissions } from '@/core/auth/permissions'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { public: true },
    },
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    {
      path: '/customers',
      name: 'customers',
      component: CustomersView,
      meta: { requiresAuth: true, permission: appPermissions.customers },
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView,
      meta: { requiresAuth: true, permission: appPermissions.products },
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: InventoryView,
      meta: { requiresAuth: true, permission: appPermissions.inventory },
    },
    {
      path: '/finance',
      name: 'finance',
      component: FinanceView,
      meta: { requiresAuth: true, permission: appPermissions.finance },
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
      meta: { requiresAuth: true, permission: appPermissions.settings },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()

  if (to.meta.public) {
    if (authStore.isAuthenticated && to.name === 'login') {
      next('/')
      return
    }

    next()
    return
  }

  if (!authStore.isAuthenticated) {
    next('/login')
    return
  }

  const requiredPermission = to.meta.permission as string | undefined

  if (requiredPermission && !authStore.permissions.includes(requiredPermission)) {
    next('/')
    return
  }

  next()
})

export default router
