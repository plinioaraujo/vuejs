export const appConfig = {
  name: 'Business Boilerplate',
  version: '1.0.0',
  environment: import.meta.env.MODE,
  defaultLocale: 'pt-BR',
  modules: ['dashboard', 'customers', 'inventory', 'finance', 'settings'],
}
