import { describe, expect, it } from 'vitest';
import { dashboard } from './mockData.js';

describe('dashboard mock data', () => {
  it('contains flight readiness data for the check-in dashboard', () => {
    expect(dashboard.kpis.openVendorDefects).toBeGreaterThan(0);
    expect(dashboard.flights).toHaveLength(3);
    expect(dashboard.flights[0].stages.boardingPass).toBe('green');
  });
});
