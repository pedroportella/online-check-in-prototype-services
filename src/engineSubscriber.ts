import { recordEngineTelemetry } from './telemetryStore.js';
import type { SimulatorEngineId, SimulatorTelemetryEvent } from './types.js';

interface EngineSubscription {
  engineId: SimulatorEngineId;
  latestUrl: string;
}

const DEFAULT_ENGINE_SUBSCRIPTION_INTERVAL_MS = 5000;

const engineSubscriptions: EngineSubscription[] = [
  {
    engineId: 'simulator-engine-1',
    latestUrl: process.env.SIMULATOR_ENGINE_1_URL ?? 'http://127.0.0.1:7011/api/v1/telemetry/latest',
  },
  {
    engineId: 'simulator-engine-2',
    latestUrl: process.env.SIMULATOR_ENGINE_2_URL ?? 'http://127.0.0.1:7012/api/v1/telemetry/latest',
  },
];

let subscriptionTimer: NodeJS.Timeout | undefined;

async function readEngineTelemetry(subscription: EngineSubscription): Promise<void> {
  const response = await fetch(subscription.latestUrl, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`${subscription.engineId} returned ${response.status}`);
  }

  const event = (await response.json()) as SimulatorTelemetryEvent;
  recordEngineTelemetry(event);
}

export async function refreshTelemetryFromEngines(): Promise<void> {
  await Promise.allSettled(engineSubscriptions.map((subscription) => readEngineTelemetry(subscription)));
}

export function subscribeToSimulatorEngines(): void {
  if (subscriptionTimer) return;

  void refreshTelemetryFromEngines();
  subscriptionTimer = setInterval(() => {
    void refreshTelemetryFromEngines();
  }, Number(process.env.SIMULATOR_SUBSCRIPTION_INTERVAL_MS ?? DEFAULT_ENGINE_SUBSCRIPTION_INTERVAL_MS));
}

export function stopSimulatorEngineSubscription(): void {
  if (!subscriptionTimer) return;
  clearInterval(subscriptionTimer);
  subscriptionTimer = undefined;
}
