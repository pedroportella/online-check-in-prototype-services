# Online Check-in Prototype Services

Node/Fastify API prototype for the Virgin Australia online check-in delivery demo.

## Runtime

Use Node.js 20.19 or newer. Vite/Vitest use native optional bindings that should be installed with the same runtime used for builds and tests.

## Scripts

- `pnpm install`
- `pnpm dev` starts the API on `http://127.0.0.1:7003`
- `GET /api/v1/check-in/dashboard` returns the dashboard payload
