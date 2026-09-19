import { http } from '@/core/api/http'
import { buildMockJwt, decodeJwt } from '@/core/auth/jwt'
import type { AuthResponse, LoginPayload } from '@/core/types/auth'

export async function loginRequest(payload: LoginPayload): Promise<AuthResponse> {
  try {
    const response = await http.post<AuthResponse>('/auth/login', payload)

    if (response.data.accessToken) {
      return response.data
    }
  } catch {
    // Fallback de desenvolvimento para permitir uma base funcional
  }

  const mockToken = buildMockJwt({
    sub: 'user-1',
    email: payload.email,
    name: 'Administrador',
    roles: ['admin'],
    permissions: [
      'dashboard:view',
      'products:manage',
      'customers:manage',
      'inventory:manage',
      'finance:manage',
      'settings:manage',
    ],
  })

  const decoded = decodeJwt(mockToken)

  return {
    accessToken: mockToken,
    user: {
      id: decoded?.sub ?? 'user-1',
      email: decoded?.email ?? payload.email,
      name: decoded?.name ?? 'Administrador',
      roles: decoded?.roles ?? ['admin'],
      permissions: decoded?.permissions ?? [],
    },
  }
}
