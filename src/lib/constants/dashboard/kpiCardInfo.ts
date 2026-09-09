import { IKpiCardData } from "@/types/dashboard/dashboard.types";


export const kpiDemoData: IKpiCardData[] = [
  {
    kpi_card_name: "Total Revenue",
    week: {
      value: 12398,
      isGrowth: true,
      rate: 4.36,
    },
    month: {
      value: 48920,
      isGrowth: true,
      rate: 11.2,
    },
  },
  {
    kpi_card_name: "Total Orders",
    week: {
      value: 1000,
      isGrowth: true,
      rate: 25,
    },
    month: {
      value: 4200,
      isGrowth: false,
      rate: 8,
    },
  },
  {
    kpi_card_name: "Total Delivered",
    week: {
      value: 2728,
      isGrowth: false,
      rate: 14.87,
    },
    month: {
      value: 10450,
      isGrowth: true,
      rate: 6.4,
    },
  },
  {
    kpi_card_name: "Refund",
    week: {
      value: 472,
      isGrowth: true,
      rate: 4.24,
    },
    month: {
      value: 1830,
      isGrowth: false,
      rate: 2.1,
    },
  },
  {
    kpi_card_name: "Active Users",
    week: {
      value: 3540,
      isGrowth: true,
      rate: 9.8,
    },
    month: {
      value: 14200,
      isGrowth: true,
      rate: 15.6,
    },
  },
];