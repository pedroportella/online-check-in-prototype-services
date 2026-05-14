# Services Architecture

`online-check-in-prototype-services` is the BFF boundary for the prototype.

The service exposes a stable dashboard contract to the UI and absorbs simulator volatility behind the API. Each simulator engine publishes its latest telemetry at `/api/v1/telemetry/latest`; the BFF subscribes by polling those endpoints, stores the latest event per engine and recalculates flight readiness and KPI values for `/api/v1/check-in/dashboard`.

```txt
simulator-engine-1 /api/v1/telemetry/latest -> services subscription
simulator-engine-2 /api/v1/telemetry/latest -> services subscription

/api/v1/check-in/dashboard -> consolidated dashboard
```

The current store is in memory to keep the demo lightweight. A production version would move this behind a cache, stream processor or service client layer.
