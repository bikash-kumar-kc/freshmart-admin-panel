import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/components/ui/dropdown-menu";

type DropdownAction<T> = {
  actionName: string;
  method: (data: T) => void;
  variant?: "default" | "destructive";
  confirmMessage?: string;
};

type GenericDropdownProps<T> = {
  data: T;
  actions: DropdownAction<T>[];
  onConfirm?: (action: DropdownAction<T>) => void;
};

export function GenericDropdown<T>({
  data,
  actions,
  onConfirm,
}: GenericDropdownProps<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          onClick={(e) => e.stopPropagation()}
          className="p-1.5 rounded-sm hover:bg-menu-item-hover-bg text-app-foreground"
        >
          <MoreVertical size={16} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="bg-app-background border-app-border text-app-foreground px-2 py-3"
      >
        {actions.map((action, idx) => (
          <DropdownMenuItem
            key={action.actionName}
            onClick={(e) => {
              e.stopPropagation();

              if (action.confirmMessage) {
                onConfirm?.(action);
              } else {
                action.method(data);
              }
            }}
            className={
              action.variant === "destructive"
                ? "text-status-rejected-text focus:bg-status-rejected-bg focus:text-status-rejected-text"
                : `focus:bg-[#262626] focus:text-app-foreground ${
                    idx !== 0 ? "mt-2" : "mt-0"
                  }`
            }
          >
            {action.actionName}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
