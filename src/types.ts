export type CheckInStage = 'identity' | 'bags' | 'seats' | 'docs' | 'boardingPass';
export type Workstream = 'vendor' | 'offshore' | 'security' | 'release';
export type FlightStatus = 'Ready' | 'Watch' | 'Blocked';
export type StageStatus = 'green' | 'amber' | 'red';

export interface OptionItem<TValue extends string = string> {
  label: string;
  value: TValue;
}

export interface HeaderNavigationItem {
  label: string;
  href: string;
  icon: 'calendar' | 'signOut' | 'user';
}

export interface PageHeaderContent {
  title: string;
  description: string;
  primaryAction: {
    label: string;
    href: string;
  };
}

export interface FlightReadiness {
  id: string;
  route: string;
  departure: string;
  status: FlightStatus;
  checkedIn: number;
  exceptions: number;
  stages: Record<CheckInStage, StageStatus>;
}

export interface DeliveryKpis {
  checkInCompletionPercent: number;
  openVendorDefects: number;
  aiReviewCoveragePullRequests: number;
  passengerExceptions: number;
}

export interface KpiCardContent {
  label: string;
  value: string;
}

export interface CheckInDashboard {
  generatedAt: string;
  header: {
    title: string;
    items: HeaderNavigationItem[];
  };
  pageHeader: PageHeaderContent;
  releaseOptions: OptionItem[];
  stageLabels: Record<CheckInStage, string>;
  stageSummaries: Record<CheckInStage, string>;
  workstreamLabels: Record<Workstream, string>;
  defaultReleaseFocus: string;
  defaultWorkstream: Workstream;
  defaultActiveStages: CheckInStage[];
  controlsTitle: string;
  releaseFocusLabel: string;
  releaseFocusHint: string;
  workstreamLegend: string;
  journeyStagesLegend: string;
  leadNoteTitle: string;
  leadNote: string;
  kpiCards: KpiCardContent[];
  kpis: DeliveryKpis;
  flights: FlightReadiness[];
}
