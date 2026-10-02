// notifications/NotificationPillBar.tsx
"use client";

import { notificationPills } from "@/lib/constants/notification/notificationPillConfig";
import { NotificationPillValue } from "@/types/notification/notification.types";
import { motion } from "framer-motion";


interface NotificationPillBarProps {
  value: NotificationPillValue;
  onChange: (value: NotificationPillValue) => void;
}

export function NotificationPillBar({ value, onChange }: NotificationPillBarProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      {notificationPills.map((pill, i) => {
        const isActive = value === pill.value;
        return (
          <motion.button
            key={String(pill.value)}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06, duration: 0.25, ease: "easeOut" }}
            onClick={() => onChange(pill.value)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm border border-green-400 whitespace-nowrap select-none ${
              isActive
                ? "text-white border-transparent font-medium"
                : "bg-transparent text-slate-500 border-app-border hover:border-[#3B6D11]/30"
            }`}
            style={isActive ? { backgroundColor: "#3B6D11" } : undefined}
          >
            {pill.label}
          </motion.button>
        );
      })}
    </div>
  );
}