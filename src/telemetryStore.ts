import type {
  CheckInDashboard,
  ConsolidatedTelemetry,
  SimulatorFlightTelemetry,
  SimulatorTelemetryEvent,
} from './types.js';

const latestByEngine = new Map<string, SimulatorTelemetryEvent>();

const randomSeedTelemetry: SimulatorTelemetryEvent[] = [
  {
    engineId: 'simulator-engine-1',
    sequence: 0,
    emittedAt: new Date('2026-05-13T04:30:00.000Z').toISOString(),
    intervalMs: 60000,
    flights: [
      {
        flightId: 'VA938',
        route: 'BNE to SYD',
        checkedIn: 142,
        exceptions: 7,
        completionPercent: 88,
        queueDepth: 18,
        latencyMs: 240,
      },
      {
        flightId: 'VA322',
        route: 'MEL to BNE',
        checkedIn: 118,
        exceptions: 15,
        completionPercent: 81,
        queueDepth: 31,
        latencyMs: 420,
      },
    ],
  },
  {
    engineId: 'simulator-engine-2',
    sequence: 0,
    emittedAt: new Date('2026-05-13T04:30:30.000Z').toISOString(),
    intervalMs: 30000,
    flights: [
      {
        flightId: 'VA476',
        route: 'PER to ADL',
        checkedIn: 96,
        exceptions: 4,
        completionPercent: 92,
        queueDepth: 9,
        latencyMs: 180,
      },
    ],
  },
];

function normaliseFlightTelemetry(flights: SimulatorTelemetryEvent['flights']): SimulatorFlightTelemetry[] {
  return flights.map((flight) => ({
    ...flight,
    checkedIn: Math.max(0, Math.round(flight.checkedIn)),
    exceptions: Math.max(0, Math.round(flight.exceptions)),
    completionPercent: Math.min(100, Math.max(0, Number(flight.completionPercent.toFixed(1)))),
    queueDepth: Math.max(0, Math.round(flight.queueDepth)),
    latencyMs: Math.max(0, Math.round(flight.latencyMs)),
  }));
}

export function resetTelemetryStore(): void {
  latestByEngine.clear();
  for (const event of randomSeedTelemetry) {
    latestByEngine.set(event.engineId, event);
  }
}

export function recordEngineTelemetry(event: SimulatorTelemetryEvent): ConsolidatedTelemetry {
  latestByEngine.set(event.engineId, {
    ...event,
    flights: normaliseFlightTelemetry(event.flights),
  });

  return getConsolidatedTelemetry();
}

export function getConsolidatedTelemetry(): ConsolidatedTelemetry {
  const events = [...latestByEngine.values()].sort((left, right) => left.engineId.localeCompare(right.engineId));
  const generatedAt = new Date().toISOString();

  return {
    generatedAt,
    engines: events.map((event) => ({
      engineId: event.engineId,
      sequence: event.sequence,
      emittedAt: event.emittedAt,
      intervalMs: event.intervalMs,
      flightCount: event.flights.length,
    })),
    flights: events.flatMap((event) => event.flights),
  };
}

export function buildDashboardWithTelemetry(dashboard: CheckInDashboard): CheckInDashboard {
  const telemetry = getConsolidatedTelemetry();
  const telemetryByFlight = new Map(telemetry.flights.map((flight) => [flight.flightId, flight]));

  const flights = dashboard.flights.map((flight) => {
    const telemetryFlight = telemetryByFlight.get(flight.id);

    if (!telemetryFlight) {
      return flight;
    }

    return {
      ...flight,
      checkedIn: telemetryFlight.checkedIn,
      exceptions: telemetryFlight.exceptions,
      status: telemetryFlight.exceptions > 20 ? 'Blocked' : telemetryFlight.exceptions > 10 ? 'Watch' : 'Ready',
    } satisfies CheckInDashboard['flights'][number];
  });

  const totalCheckedIn = flights.reduce((sum, flight) => sum + flight.checkedIn, 0);
  const totalExceptions = flights.reduce((sum, flight) => sum + flight.exceptions, 0);
  const averageCompletion = telemetry.flights.length
    ? telemetry.flights.reduce((sum, flight) => sum + flight.completionPercent, 0) / telemetry.flights.length
    : dashboard.kpis.checkInCompletionPercent;

  return {
    ...dashboard,
    generatedAt: telemetry.generatedAt,
    telemetry,
    flights,
    kpis: {
      ...dashboard.kpis,
      checkInCompletionPercent: Number(averageCompletion.toFixed(1)),
      passengerExceptions: totalExceptions,
    },
    kpiCards: dashboard.kpiCards.map((card) => {
      if (card.label === 'Check-in completion') return { ...card, value: `${averageCompletion.toFixed(1)}%` };
      if (card.label === 'Passenger exceptions') return { ...card, value: String(totalExceptions) };
      if (card.label === 'Vendor defects open') return { ...card, value: String(Math.max(0, dashboard.kpis.openVendorDefects + totalExceptions - 26)) };
      if (card.label === 'AI review coverage') return { ...card, value: `${Math.max(64, totalCheckedIn - 290)} PRs` };
      return card;
    }),
  };
}

resetTelemetryStore();
