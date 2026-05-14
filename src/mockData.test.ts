import { describe, expect, it } from 'vitest';
import { dashboard } from './mockData.js';
import { buildDashboardWithTelemetry, recordEngineTelemetry, resetTelemetryStore } from './telemetryStore.js';

describe('dashboard mock data', () => {
  it('contains flight readiness data for the check-in dashboard', () => {
    expect(dashboard.kpis.openVendorDefects).toBeGreaterThan(0);
    expect(dashboard.flights).toHaveLength(3);
    expect(dashboard.flights[0].stages.boardingPass).toBe('green');
  });

  it('consolidates simulator telemetry into dashboard flight data', () => {
    resetTelemetryStore();
    recordEngineTelemetry({
      engineId: 'simulator-engine-2',
      sequence: 42,
      emittedAt: new Date('2026-05-14T00:00:00.000Z').toISOString(),
      intervalMs: 30000,
      flights: [
        {
          flightId: 'VA322',
          route: 'MEL to BNE',
          checkedIn: 130,
          exceptions: 22,
          completionPercent: 76.5,
          queueDepth: 44,
          latencyMs: 510
        }
      ]
    });

    const consolidated = buildDashboardWithTelemetry(dashboard);
    const flight = consolidated.flights.find((item) => item.id === 'VA322');

    expect(consolidated.telemetry.engines).toHaveLength(2);
    expect(flight?.checkedIn).toBe(130);
    expect(flight?.status).toBe('Blocked');
  });
});
