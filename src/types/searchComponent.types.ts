import { Icon } from "next/dist/lib/metadata/types/metadata-types";

export interface ISearchComponent {
  placeholder: string;
  value: string;
  onChange: (searchValue: string) => void;
  style?: string;
  containerSytling?: string;
  searchIconStyle?: string;
  searchIcon?: Icon;
  searchIconSize?: number;
  onBlur?: () => void;
  autofocus: boolean;
}
