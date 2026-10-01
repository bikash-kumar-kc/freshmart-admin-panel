// lib/comboboxStyles.ts
export const comboboxTriggerClass =
  "w-full flex items-center justify-between gap-2 px-3 py-2 rounded-sm border border-input-border bg-input-background text-sm text-input-text hover:border-input-border-focus transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

export const comboboxItemClass =
  "relative cursor-pointer rounded-sm py-2 pl-8 pr-3 text-sm text-button-secondary-text transition-colors " +
  "data-[selected=true]:bg-app-background-hover data-[selected=true]:!text-white";