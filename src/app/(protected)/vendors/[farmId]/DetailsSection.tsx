
import type { LucideIcon } from "lucide-react";

export interface IDetailItem {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function DetailSection({ title, items }: { title: string; items: IDetailItem[] }) {
  return (
    <div className="bg-statcard-background border border-statcard-border rounded-sm p-5">
      <h3 className="text-sm font-semibold text-app-foreground mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex items-start gap-3 p-3 rounded-sm transition-all hover:bg-brand-primary hover:text-white hover:shadow-md group"
            >
              <Icon size={16} className="mt-0.5 text-statcard-label group-hover:text-white shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-statcard-label group-hover:text-white/80">{item.label}</p>
                <p className="text-sm font-medium text-app-foreground group-hover:text-white truncate">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}