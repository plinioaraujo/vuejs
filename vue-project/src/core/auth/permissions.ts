export const appRoles = {
  admin: 'admin',
  manager: 'manager',
  user: 'user',
} as const

export const appPermissions = {
  dashboard: 'dashboard:view',
  products: 'products:manage',
  customers: 'customers:manage',
  inventory: 'inventory:manage',
  finance: 'finance:manage',
  settings: 'settings:manage',
} as const

export const rolePermissions: Record<string, string[]> = {
  [appRoles.admin]: Object.values(appPermissions),
  [appRoles.manager]: [
    appPermissions.dashboard,
    appPermissions.products,
    appPermissions.customers,
    appPermissions.inventory,
  ],
  [appRoles.user]: [appPermissions.dashboard],
}

export function hasPermission(roles: string[] = [], required: string | string[]) {
  const requiredPermissions = Array.isArray(required) ? required : [required]
  const permissions = new Set<string>()

  roles.forEach((role) => {
    ;(rolePermissions[role] ?? []).forEach((permission) => permissions.add(permission))
  })

  return requiredPermissions.every((permission) => permissions.has(permission))
}
