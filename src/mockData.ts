import type { CheckInDashboard } from './types.js';
export const dashboard: CheckInDashboard = { generatedAt: new Date('2026-05-13T04:30:00.000Z').toISOString(), kpis: { checkInCompletionPercent: 87.4, openVendorDefects: 23, aiReviewCoveragePullRequests: 64, passengerExceptions: 26 }, flights: [
  { id: 'VA938', route: 'BNE to SYD', departure: '08:05', status: 'Ready', checkedIn: 142, exceptions: 7, stages: { identity:'green', bags:'green', seats:'green', docs:'amber', boardingPass:'green' } },
  { id: 'VA322', route: 'MEL to BNE', departure: '09:20', status: 'Watch', checkedIn: 118, exceptions: 15, stages: { identity:'green', bags:'amber', seats:'green', docs:'amber', boardingPass:'green' } },
  { id: 'VA476', route: 'PER to ADL', departure: '10:10', status: 'Ready', checkedIn: 96, exceptions: 4, stages: { identity:'green', bags:'green', seats:'green', docs:'green', boardingPass:'green' } }
]};
