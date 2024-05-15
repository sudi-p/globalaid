import { ChangeEvent, useState } from "react";

export type FiltersProps = {
  commitment: Set<string>;
  workplaceType: Set<string>;
};

export interface ExtendedFiltersProps extends FiltersProps {
  searchText?: string;
  datePosted: string;
  [key: string]: Set<string> | string | undefined;
}

export type HandleCheckBoxProps = {
  e: ChangeEvent<HTMLInputElement>;
  value: string;
  filterType: keyof FiltersProps;
};

export const useJobsFilter = (initialFilters: ExtendedFiltersProps) => {
  const [filters, setFilters] = useState(initialFilters);

  const handleCheckbox = (
    e: ChangeEvent<HTMLInputElement>,
    value: string,
    filterType: keyof FiltersProps
  ) => {
    const updatedFilters = { ...filters };
    if (e.target.checked) {
      updatedFilters[filterType].add(value);
    } else {
      updatedFilters[filterType].delete(value);
    }
    setFilters(updatedFilters);
  };

  const handleDatePosted = (type: string) => {
    setFilters((prevState) => ({
      ...prevState,
      datePosted: type,
    }));
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedFilters = { ...filters };
    updatedFilters[e.target.name] = e.target.value;
    setFilters(updatedFilters);
  };

  return { filters, handleCheckbox, handleDatePosted, handleTextChange };
};