import { ISearchComponent } from "@/types/searchComponent.types";
import { Search } from "lucide-react";

interface ISearchComponentTypes {
  searchData: ISearchComponent;
}
const SearchComponent = ({ searchData }: ISearchComponentTypes) => {
  return (
    <div
      className={
        searchData.containerSytling
          ? searchData.containerSytling
          : "hidden md:block relative w-72"
      }
    >
      <Search
        size={searchData.searchIconSize ? searchData.searchIconSize : 16}
        className={
          searchData.searchIconStyle
            ? searchData.searchIconStyle
            : "absolute left-3 top-1/2 -translate-y-1/2 text-app-muted-foreground"
        }
      />
      <input
        value={searchData.value}
        autoFocus={searchData.autofocus}
        onChange={(e) => searchData.onChange(e.target.value)}
        onBlur={searchData.onBlur ? searchData.onBlur : () => {}}
        placeholder={searchData.placeholder}
        className={`w-full pl-9 pr-3 py-2 border border-input-border rounded-sm text-sm bg-input-background text-input-text focus:border-input-border-focus outline-none ${searchData.style}`}
      />
    </div>
  );
};

export default SearchComponent;
