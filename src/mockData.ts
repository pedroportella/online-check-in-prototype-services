import type { CheckInDashboard } from './types.js';

export const dashboard: CheckInDashboard = {
  generatedAt: new Date('2026-05-13T04:30:00.000Z').toISOString(),
  header: {
    title: 'Virgin Australia Online Check-in',
    items: [
      { label: 'Pedro Portella', href: '/profile', icon: 'user' },
      { label: 'Roster', href: '/roster', icon: 'calendar' },
      { label: 'Sign out', href: '/sign-out', icon: 'signOut' }
    ]
  },
  pageHeader: {
    title: 'Online check-in delivery cockpit',
    description:
      'Lead-facing prototype for governing vendor quality, offshore delivery, AI-assisted checks and operational readiness before September go-live.',
    primaryAction: {
      label: 'Review flights',
      href: '#journey-board'
    }
  },
  releaseOptions: [
    { label: 'September go-live readiness', value: 'sept' },
    { label: 'Vendor code quality sweep', value: 'quality' },
    { label: 'Offshore build governance', value: 'offshore' }
  ],
  stageLabels: {
    identity: 'Identity',
    bags: 'Bags',
    seats: 'Seats',
    docs: 'Travel docs',
    boardingPass: 'Boarding pass'
  },
  stageSummaries: {
    identity: 'Green',
    bags: 'Green',
    seats: 'Green',
    docs: '92.8%',
    boardingPass: '99.1%'
  },
  workstreamLabels: {
    vendor: 'Vendor QA',
    offshore: 'Offshore build',
    security: 'Security gates',
    release: 'Release readiness'
  },
  defaultReleaseFocus: 'sept',
  defaultWorkstream: 'vendor',
  defaultActiveStages: ['identity', 'bags', 'docs', 'boardingPass'],
  controlsTitle: 'Delivery controls',
  releaseFocusLabel: 'Focus',
  releaseFocusHint: 'Switch the operating view without changing the journey baseline.',
  workstreamLegend: 'Lead workstream',
  journeyStagesLegend: 'Journey stages',
  leadNoteTitle: 'Lead note',
  leadNote:
    'Use AI-assisted PR summaries to triage risky vendor changes, then route high-risk items through accessibility, security and release gates.',
  kpiCards: [
    { label: 'Check-in completion', value: '87.4%' },
    { label: 'Vendor defects open', value: '23' },
    { label: 'AI review coverage', value: '64 PRs' },
    { label: 'Passenger exceptions', value: '26' }
  ],
  kpis: {
    checkInCompletionPercent: 87.4,
    openVendorDefects: 23,
    aiReviewCoveragePullRequests: 64,
    passengerExceptions: 26
  },
  flights: [
    {
      id: 'VA938',
      route: 'BNE to SYD',
      departure: '08:05',
      status: 'Ready',
      checkedIn: 142,
      exceptions: 7,
      stages: { identity: 'green', bags: 'green', seats: 'green', docs: 'amber', boardingPass: 'green' }
    },
    {
      id: 'VA322',
      route: 'MEL to BNE',
      departure: '09:20',
      status: 'Watch',
      checkedIn: 118,
      exceptions: 15,
      stages: { identity: 'green', bags: 'amber', seats: 'green', docs: 'amber', boardingPass: 'green' }
    },
    {
      id: 'VA476',
      route: 'PER to ADL',
      departure: '10:10',
      status: 'Ready',
      checkedIn: 96,
      exceptions: 4,
      stages: { identity: 'green', bags: 'green', seats: 'green', docs: 'green', boardingPass: 'green' }
    }
  ]
};
