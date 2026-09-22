// lib/formatOfferRemaining.ts
export function formatOfferRemaining(offerEndDate: string | null): string | null {
  if (!offerEndDate) return null;

  const end = new Date(offerEndDate).getTime();
  const now = Date.now();
  const diffMs = end - now;

  if (diffMs <= 0) return null; // offer expired — treat as no offer

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (days >= 7) {
    const weeks = Math.floor(days / 7);
    return `${weeks} week${weeks > 1 ? "s" : ""} left`;
  }
  if (days >= 1) {
    return `${days} day${days > 1 ? "s" : ""} left`;
  }
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  return `${hours} hour${hours !== 1 ? "s" : ""} left`;
}