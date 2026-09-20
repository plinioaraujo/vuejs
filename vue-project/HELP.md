# Guia de desenvolvimento do boilerplate

Este projeto é uma base Vue 3 + TypeScript para sistemas empresariais. A infraestrutura comum fica isolada em `core`, `shared`, `layouts`, `stores` e `router`. Cada regra de negócio deve ser implementada dentro de um módulo em `features`.

## 1. O que já está pronto

- Vue 3, Vite e TypeScript
- Pinia para estado global e estado dos módulos
- Vue Router com rotas públicas, protegidas e controle por permissão
- Cliente HTTP Axios centralizado
- Autenticação com token JWT, persistência local e hidratação do usuário
- Fallback de JWT mock para desenvolvimento sem backend
- Perfis `admin`, `manager` e `user`
- Componentes reutilizáveis de input, botão e tabela
- Factory de serviços CRUD
- Composable `useCrud` para listar, criar, atualizar e remover entidades
- Layout principal com navegação e suporte a tema
- Módulo de produtos como exemplo funcional

O backend real deve fornecer o endpoint de login e os endpoints de cada domínio. Enquanto ele não estiver disponível, o login possui um fallback local para manter o fluxo navegável em desenvolvimento.

O módulo de produtos também possui um modo demonstrativo: sem `VITE_API_BASE_URL`, os produtos são mantidos localmente no navegador e as operações de cadastro, edição e exclusão não acessam a rede. Para usar a API real, configure a variável em `.env.local`.

## 2. Requisitos e comandos

Use Node.js `22.18+` ou `24.12+`.

```bash
npm install
npm run dev
```

Comandos disponíveis:

```bash
npm run build       # type-check e build de produção
npm run type-check  # validação TypeScript/Vue
npm run lint        # ESLint
npm run format      # formatação com Prettier
npm run preview     # serve o build localmente
```

Para apontar para uma API real, defina a variável no arquivo `.env.local`:

```env
VITE_API_BASE_URL=https://api.seu-sistema.com
```

O cliente HTTP usa essa URL e envia automaticamente o token armazenado em `access_token` como `Bearer`.

## 3. Estrutura da aplicação

```text
src/
  core/                         # infraestrutura reutilizável e agnóstica de domínio
    api/                        # cliente HTTP
    auth/                       # JWT e permissões
    composables/                # comportamentos compartilhados, como useCrud
    crud/                       # factories de serviços
    types/                      # tipos transversais
  features/                     # módulos de negócio
    auth/                        # login
    customers/                  # clientes
    dashboard/                  # dashboard
    finance/                    # financeiro
    inventory/                  # estoque
    products/                    # exemplo completo
    settings/                    # configurações
  layouts/                      # composição visual da aplicação
  shared/components/            # componentes visuais reutilizáveis
  stores/                       # estado global, como autenticação
  router/                       # rotas e guards
  App.vue
  main.ts
```

### Regra de dependência

- `core` não conhece regras de produtos, clientes ou outros domínios.
- `shared` contém componentes genéricos, sem chamadas de API específicas.
- `features` pode consumir `core` e `shared`.
- Regras de negócio, tipos, APIs e services ficam no próprio módulo.
- O router apenas registra a entrada do módulo e suas permissões.

## 4. Autenticação e permissões

O login é realizado pela store global:

```ts
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
await authStore.login(email, password)
```

O `authService` tenta chamar `POST /auth/login`. A resposta esperada é:

```ts
{
  accessToken: string
  user: {
    id: string
    name: string
    email: string
    roles: string[]
    permissions: string[]
  }
}
```

Ao iniciar a aplicação, o token é lido de `localStorage`, validado e convertido novamente em usuário. Para sair:

```ts
authStore.logout()
```

As permissões ficam centralizadas em `src/core/auth/permissions.ts`. Para criar uma nova permissão:

```ts
export const appPermissions = {
  // permissões existentes...
  reports: 'reports:view',
  orders: 'orders:manage',
} as const
```

Depois, associe as novas permissões aos perfis em `rolePermissions` e use-as nas rotas:

```ts
{
  path: '/reports',
  name: 'reports',
  component: ReportsView,
  meta: {
    requiresAuth: true,
    permission: appPermissions.reports,
  },
}
```

O guard do router redireciona usuários sem autenticação para `/login` e usuários sem permissão para `/`.

## 5. Componentes compartilhados

Use os componentes de `src/shared/components` para manter aparência e comportamento consistentes:

- `BaseInput`: campos de texto e formulários
- `BaseButton`: ações com variantes de estilo
- `BaseTable`: tabela baseada em colunas e linhas

Componentes específicos de um domínio devem ficar em `src/features/<dominio>/components`, e não em `shared`.

## 6. Criando um novo módulo

Para um domínio chamado `orders`, use esta estrutura:

```text
src/features/orders/
  api/ordersApi.ts
  components/                 # opcional
  services/ordersService.ts
  stores/ordersStore.ts
  types/order.ts
  views/OrdersView.vue
```

### 6.1 Defina os tipos

```ts
// src/features/orders/types/order.ts
export interface Order {
  id: number
  customerName: string
  total: number
  status: 'pending' | 'paid' | 'cancelled'
}

export type OrderFormData = Omit<Order, 'id'>
```

### 6.2 Implemente a API do domínio

```ts
// src/features/orders/api/ordersApi.ts
import { http } from '@/core/api/http'
import type { Order, OrderFormData } from '../types/order'

export async function getOrders() {
  const response = await http.get<Order[]>('/orders')
  return response.data
}

export async function createOrder(payload: OrderFormData) {
  const response = await http.post<Order>('/orders', payload)
  return response.data
}

export async function updateOrder(id: number, payload: OrderFormData) {
  const response = await http.put<Order>(`/orders/${id}`, payload)
  return response.data
}

export async function deleteOrder(id: number) {
  await http.delete(`/orders/${id}`)
}
```

### 6.3 Adapte a API para o CRUD base

```ts
// src/features/orders/services/ordersService.ts
import { createCrudService } from '@/core/crud/createCrudService'
import { createOrder, deleteOrder, getOrders, updateOrder } from '../api/ordersApi'
import type { Order, OrderFormData } from '../types/order'

export const ordersService = createCrudService<Order, OrderFormData, OrderFormData>({
  list: getOrders,
  getById: async (id) => {
    const orders = await getOrders()
    return orders.find((order) => order.id === Number(id)) as Order
  },
  create: createOrder,
  update: (id, payload) => updateOrder(Number(id), payload),
  remove: (id) => deleteOrder(Number(id)),
})
```

### 6.4 Crie a store usando `useCrud`

```ts
// src/features/orders/stores/ordersStore.ts
import { defineStore } from 'pinia'
import { useCrud } from '@/core/composables/useCrud'
import { ordersService } from '../services/ordersService'
import type { Order, OrderFormData } from '../types/order'

export const useOrdersStore = defineStore('orders', () => {
  const { items, loading, fetchAll, create, updateById, removeById } = useCrud<
    Order,
    OrderFormData,
    OrderFormData
  >(ordersService)

  return {
    items,
    loading,
    loadOrders: fetchAll,
    saveOrder: (payload: OrderFormData, id?: number) =>
      id ? updateById(id, payload) : create(payload),
    removeOrder: removeById,
  }
})
```

### 6.5 Registre a view e a rota

Crie `OrdersView.vue`, consumindo a store e os componentes compartilhados. Depois registre a rota em `src/router/index.ts` com uma permissão própria:

```ts
{
  path: '/orders',
  name: 'orders',
  component: OrdersView,
  meta: { requiresAuth: true, permission: appPermissions.orders },
}
```

Por fim, inclua o item na navegação do `MainLayout.vue`, caso o módulo deva aparecer no menu.

## 7. Módulo de referência: produtos

O módulo `src/features/products` demonstra o fluxo completo:

```text
products/
  api/productsApi.ts
  services/productsService.ts
  stores/productsStore.ts
  types/product.ts
  views/ProductsView.vue
```

Use-o como referência para integração com API, formulário, tabela, criação, edição, remoção e indicadores do domínio. O módulo é um exemplo de implementação, não deve ser copiado para o `core`.

## 8. Checklist antes de entregar um módulo

- [ ] O domínio possui uma pasta própria em `src/features`.
- [ ] Tipos de resposta e formulário estão definidos.
- [ ] A API usa o cliente HTTP compartilhado.
- [ ] A store usa `useCrud` quando o domínio possui operações CRUD.
- [ ] Regras de negócio estão no service ou store do domínio.
- [ ] A view usa componentes compartilhados quando aplicável.
- [ ] A rota exige autenticação e a permissão correta.
- [ ] A permissão foi associada aos perfis necessários.
- [ ] O item de navegação foi incluído quando necessário.
- [ ] `npm run type-check`, `npm run lint` e `npm run build` passam.

## 9. Princípio da base

A infraestrutura deve ser reutilizada; a regra de negócio deve ser localizada. Ao iniciar um novo sistema, mantenha `core`, `shared`, `layouts`, `stores` e `router` genéricos e concentre a implementação específica em `features/<dominio>`.
