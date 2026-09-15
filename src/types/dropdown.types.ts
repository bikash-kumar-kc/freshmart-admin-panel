export interface IDropdownAction<T> {
  actionName: string;
  method: (data: T) => void | Promise<void>;
  variant?: "default" | "destructive";
  confirmMessage?: string;
}
export type GenericDropdownProps<T> = {
  data: T;
  actions: IDropdownAction<T>[];
};
