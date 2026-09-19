
"use client";

import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/components/ui/tooltip";

export function ProductListingPageHeading({
  farmName,
  vendorId,
}: {
  farmName: string;
  vendorId: string;
}) {
  const router = useRouter();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={() => router.push(`/vendors/${vendorId}`)}
          className="text-left group"
        >
          <h1 className="text-xl font-semibold text-app-foreground group-hover:text-brand-primary transition-colors">
            {farmName}
          </h1>
          <p className="text-[10px] font-semibold text-app-muted-foreground">
            Vendor ID: {vendorId}
          </p>
        </button>
      </TooltipTrigger>
      <TooltipContent>Click to visit vendor</TooltipContent>
    </Tooltip>
  );
}
