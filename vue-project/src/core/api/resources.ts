import { http } from './http'

export const api = {
  getDashboard: () => http.get('/dashboard'),
  getCustomers: () => http.get('/customers'),
  getInventory: () => http.get('/inventory'),
  getFinance: () => http.get('/finance'),
  login: (email: string, password: string) =>
    http.post('/auth/login', {
      email,
      password,
    }),
}
