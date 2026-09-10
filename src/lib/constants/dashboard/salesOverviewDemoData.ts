import { ISalesOverviewPoint } from "@/types/dashboard/salesOverview.types";


function generateYearData(startYear: number): ISalesOverviewPoint[] {
  const points: ISalesOverviewPoint[] = [];
  const start = new Date(startYear, 0, 1);

  for (let i = 0; i < 52; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i * 7);

    const baseEarning = 4000 + Math.sin(i / 6) * 1500 + Math.random() * 800;
    const baseExpenditure = 2500 + Math.cos(i / 8) * 900 + Math.random() * 600;

    points.push({
      date: date.toISOString(),
      earning: Math.round(baseEarning),
      expenditure: Math.round(baseExpenditure),
    });
  }

  return points;
}

const currentYear = new Date().getFullYear();

export const salesOverviewDemoData: Record<"thisYear" | "previousYear", ISalesOverviewPoint[]> = {
  thisYear: generateYearData(currentYear),
  previousYear: generateYearData(currentYear - 1),
};