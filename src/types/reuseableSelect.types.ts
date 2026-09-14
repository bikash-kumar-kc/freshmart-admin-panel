export interface IReuseableSelect<T> {
  select: {
    value: string;
    onSelectChange: (value: T) => void;
    default: string;
  };
  trigger: {
    style: string;
    placeholder: string;
  };
  content: {
    style: string;
    items: {
      name: string;
      value: string;
      style: string;
    }[];
  };
}
