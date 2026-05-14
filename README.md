# Online Check-in Prototype Services

Node.js/Fastify BFF for the Virgin Australia online check-in prototype.

The service consolidates static check-in dashboard content with live-style telemetry from two simulator engines. The service subscribes to the engine telemetry endpoints, and the UI subscribes only to this BFF dashboard contract.

## What It Demonstrates

- Fastify API for check-in dashboard and flight readiness data.
- BFF subscription/polling of telemetry from `simulator-engine-1` and `simulator-engine-2`.
- In-memory telemetry store seeded with realistic fallback data for demos.
- Docker image and local compose runtime.
- GitHub Actions validation for install, typecheck, test, build and Docker build.

## Runtime Requirements

- Node.js 20.19+.
- pnpm 9.15.4 via Corepack.
- Docker Desktop for container validation.

## Local Setup

```bash
corepack enable
pnpm install
pnpm dev
```

The API runs at `http://127.0.0.1:7003`.

## API Endpoints

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/health` | GET | Service health |
| `/api/v1/check-in/dashboard` | GET | Consolidated dashboard for the UI |
| `/api/v1/check-in/flights/:flightId` | GET | One flight from the consolidated dashboard |
| `/api/v1/telemetry/consolidated` | GET | Current BFF telemetry state |

## Engine Subscriptions

| Variable | Default | Description |
| --- | --- | --- |
| `SIMULATOR_ENGINE_1_URL` | `http://127.0.0.1:7011/api/v1/telemetry/latest` | Engine 1 latest telemetry endpoint |
| `SIMULATOR_ENGINE_2_URL` | `http://127.0.0.1:7012/api/v1/telemetry/latest` | Engine 2 latest telemetry endpoint |
| `SIMULATOR_SUBSCRIPTION_INTERVAL_MS` | `5000` | BFF polling cadence for engine subscriptions |

## Verification

```bash
pnpm typecheck
pnpm test
pnpm build
```

## Docker

```bash
docker compose up --build
curl -i http://127.0.0.1:7003/health
```

## CI/CD

`.github/workflows/ci.yml` runs on pushes, pull requests and manual dispatch. It verifies TypeScript, tests, production build and Docker image creation.
