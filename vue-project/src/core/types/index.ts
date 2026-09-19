export type AppModule = 'dashboard' | 'customers' | 'inventory' | 'finance' | 'settings'

export interface NavigationItem {
  label: string
  to: string
  icon: string
}

export interface StatCardItem {
  title: string
  value: string
  trend?: string
  tone?: 'primary' | 'success' | 'warning' | 'neutral'
}
