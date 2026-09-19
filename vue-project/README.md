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

## Observações

- A autenticação está em modo demonstrativo e pode ser substituída por um backend real.
- O arquivo `.env.example` serve como base para variáveis de ambiente.
- A estrutura foi pensada para crescer por feature e não por arquivos soltos.
