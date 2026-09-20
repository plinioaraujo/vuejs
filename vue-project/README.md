# Business Boilerplate

Template base para aplicações Vue 3 + Vite + TypeScript, com organização por módulos e estrutura pronta para evoluir para projetos empresariais como CRM, ERP, inventário, financeiro e outros.

## Stack

- Vue 3
- Vite
- TypeScript
- Pinia
- Vue Router
- Axios
- ESLint
- Prettier

## Estrutura principal

- `src/core` — tipos, utilitários e configuração
- `src/shared` — componentes reutilizáveis
- `src/features` — módulos do domínio da aplicação
- `src/layouts` — layouts compartilhados
- `src/stores` — estado global
- `src/core/api` — abstração para integrações HTTP

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
npm run format
```

## Desenvolvimento sem backend

Sem `VITE_API_BASE_URL`, a aplicação usa o modo demonstrativo. A tela de produtos carrega dados locais e permite cadastrar, editar e excluir produtos sem fazer chamadas de rede.

Para usar um backend real, crie um arquivo `.env.local`:

```env
VITE_API_BASE_URL=https://api.seu-sistema.com
```

## Observações

- A autenticação está em modo demonstrativo e pode ser substituída por um backend real.
- Com `VITE_API_BASE_URL` configurada, os módulos usam os endpoints HTTP do backend e enviam o token armazenado como `Bearer`.
- O arquivo `.env.example` mostra a variável necessária para integração com uma API.
- A estrutura foi pensada para crescer por feature e não por arquivos soltos.
