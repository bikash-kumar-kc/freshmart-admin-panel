import { IReuseableSelect } from "@/types/reuseableSelect.types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
type ISelectData<T> = {
  data: IReuseableSelect<T>;
};
const ReuseableSelect = <T,>({ data }: ISelectData<T>) => {
  return (
    <Select
      value={data.select.value}
      onValueChange={(v) =>
        data.select.onSelectChange((v as T) || (data.select.default as T))
      }
    >
      <SelectTrigger className={data.trigger.style}>
        <SelectValue placeholder={data.trigger.placeholder} />
      </SelectTrigger>

      <SelectContent className={data.content.style}>
        {data.content.items.length > 0 &&
          data.content.items.map((i, idx) => (
            <SelectItem
              key={i.value}
              value={i.value}
              className={idx > 0 ? i.style : `${i.style} mt-2`}
            >
              {i.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default ReuseableSelect;
