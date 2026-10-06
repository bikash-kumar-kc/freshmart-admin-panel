"use client";
import KpiCard from "@/components/dashboard/KpiCard";
import SalesOverviewChart from "@/components/dashboard/SalesOverviewChart";
import TopProductsSection from "@/components/dashboard/TopProductSection";
import { kpiCardConfigs } from "@/lib/constants/dashboard/kpiCardConfigs";
import { useDashboardKpisQuery } from "@/lib/hooks/dashboard/useDashboardKpi";
import Motion from "@/lib/motion/motion";

const Page = () => {
  const { data: kpis } = useDashboardKpisQuery();
  if (!kpis) {
    return (
      <div>
        <p>no kpi data...</p>
      </div>
    );
  }
  return (
    <div className="text-app-foreground flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {kpiCardConfigs.map((config) => {
          const data = kpis.find((k) => k.kpi_card_name === config.key);
          if (!data) return null;
          return (
            <Motion key={config.key}>
              <KpiCard config={config} data={data} />
            </Motion>
          );
        })}
      </div>
      <div>
        <Motion delay={0.25}>
          <SalesOverviewChart />
        </Motion>
      </div>
      <div>
        <Motion delay={0.5}>
          <TopProductsSection />
        </Motion>
      </div>
    </div>
  );
};

export default Page;
