export type CheckInStage = 'identity' | 'bags' | 'seats' | 'docs' | 'boardingPass';
export type FlightStatus = 'Ready' | 'Watch' | 'Blocked';
export interface FlightReadiness { id: string; route: string; departure: string; status: FlightStatus; checkedIn: number; exceptions: number; stages: Record<CheckInStage, 'green' | 'amber' | 'red'>; }
export interface DeliveryKpis { checkInCompletionPercent: number; openVendorDefects: number; aiReviewCoveragePullRequests: number; passengerExceptions: number; }
export interface CheckInDashboard { generatedAt: string; kpis: DeliveryKpis; flights: FlightReadiness[]; }
