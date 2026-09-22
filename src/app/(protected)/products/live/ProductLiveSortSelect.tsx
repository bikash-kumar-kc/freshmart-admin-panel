import ReuseableSelect from "@/components/ReuseableSelect";
import { appPrimaryColorOption } from "../../vendors/VendorPageHeader";
import { selectItemClass } from "@/components/dashboard/SalesOverviewChart";
import { SalesSort } from "@/types/product/productLive.types";

export function ProductLiveSortSelect({
  value,
  onChange,
}: {
  value: SalesSort;
  onChange: (v: SalesSort) => void;
}) {
  return (
    <ReuseableSelect<SalesSort>
      data={{
        select: { value, onSelectChange: onChange, default: "high_to_low" },
        trigger: {
          style:
            "w-40 shrink-0 border-app-border hover:text-app-foreground transition-colors",
          placeholder: "Sort by sales",
        },
        content: {
          style: appPrimaryColorOption,
          items: [
            {
              name: "Sales: High to low",
              value: "high_to_low",
              style: selectItemClass,
            },
            {
              name: "Sales: Low to high",
              value: "low_to_high",
              style: selectItemClass,
            },
          ],
        },
      }}
    />
  );
}
