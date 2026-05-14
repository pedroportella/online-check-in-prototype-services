import cors from '@fastify/cors';
import Fastify from 'fastify';
import { refreshTelemetryFromEngines, subscribeToSimulatorEngines } from './engineSubscriber.js';
import { dashboard } from './mockData.js';
import { buildDashboardWithTelemetry, getConsolidatedTelemetry } from './telemetryStore.js';
const app = Fastify({ logger: true });
await app.register(cors, { origin: true });
app.get('/health', async () => ({ status: 'ok', service: 'online-check-in-prototype-services' }));
app.get('/api/v1/check-in/dashboard', async () => {
  await refreshTelemetryFromEngines();
  return buildDashboardWithTelemetry(dashboard);
});
app.get('/api/v1/telemetry/consolidated', async () => getConsolidatedTelemetry());
app.get('/api/v1/check-in/flights/:flightId', async (request, reply) => {
  const { flightId } = request.params as { flightId: string };
  await refreshTelemetryFromEngines();
  const flight = buildDashboardWithTelemetry(dashboard).flights.find((item) => item.id.toLowerCase() === flightId.toLowerCase());
  if (!flight) return reply.code(404).send({ message: 'Flight not found' });
  return flight;
});
const port = Number(process.env.PORT ?? 7003);
const host = process.env.HOST ?? '127.0.0.1';
subscribeToSimulatorEngines();
await app.listen({ port, host });
