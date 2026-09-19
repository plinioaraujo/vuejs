export interface JwtPayload {
  sub?: string
  email?: string
  name?: string
  roles?: string[]
  permissions?: string[]
  exp?: number
  iat?: number
}

function base64UrlDecode(value: string): string {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=')

  return decodeURIComponent(
    atob(padded)
      .split('')
      .map((character) => `%${`00${character.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join(''),
  )
}

export function decodeJwt(token: string): JwtPayload | null {
  try {
    const parts = token.split('.')

    if (parts.length < 2 || !parts[1]) {
      return null
    }

    const payload = JSON.parse(base64UrlDecode(parts[1])) as JwtPayload
    return payload
  } catch {
    return null
  }
}

export function isTokenExpired(token: string): boolean {
  const payload = decodeJwt(token)

  if (!payload?.exp) {
    return false
  }

  return Date.now() >= payload.exp * 1000
}

export function buildMockJwt(payload: JwtPayload): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const body = btoa(JSON.stringify({ ...payload, iat: Math.floor(Date.now() / 1000) }))

  return `${header.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')}.${body
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')}.signature`
}
