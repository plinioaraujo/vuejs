import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { decodeJwt, isTokenExpired } from '@/core/auth/jwt'
import type { AuthUser } from '@/core/types/auth'
import { loginRequest } from '@/features/auth/services/authService'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('access_token'))
  const user = ref<AuthUser | null>(null)

  function hydrateUserFromToken() {
    if (!token.value) {
      user.value = null
      return
    }

    if (isTokenExpired(token.value)) {
      logout()
      return
    }

    const decoded = decodeJwt(token.value)

    if (!decoded) {
      logout()
      return
    }

    user.value = {
      id: decoded.sub ?? 'user-1',
      name: decoded.name ?? 'Administrador',
      email: decoded.email ?? 'admin@boilerplate.com',
      roles: decoded.roles ?? ['admin'],
      permissions: decoded.permissions ?? [],
    }
  }

  const isAuthenticated = computed(() => Boolean(token.value) && Boolean(user.value))
  const roles = computed(() => user.value?.roles ?? [])
  const permissions = computed(() => user.value?.permissions ?? [])

  async function login(email: string, password: string) {
    const response = await loginRequest({ email, password })

    token.value = response.accessToken
    user.value = response.user

    localStorage.setItem('access_token', response.accessToken)

    return true
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('access_token')
  }

  hydrateUserFromToken()

  return {
    token,
    user,
    roles,
    permissions,
    isAuthenticated,
    login,
    logout,
  }
})
