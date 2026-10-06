import { format, formatDistanceToNow } from "date-fns";

export function formatTimestamp(iso: string) {
  if (typeof iso === "undefined") return '-';
  const date = new Date(iso);
  return `${format(date, "MMM d, yyyy h:mm a")} (${formatDistanceToNow(date, { addSuffix: true })})`;
}
