export interface ISalesOverviewPoint {
  date: string; // ISO date string, one per week
  earning: number;
  expenditure: number;
}

export type SalesOverviewPeriod = "thisYear" | "previousYear";