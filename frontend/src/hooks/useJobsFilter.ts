import { ChangeEvent, useState } from "react";

export type FiltersProps = {
  commitment: Set<string>;
  workplaceType: Set<string>;
};

export type DatePostedProps = {
  label: string, value:number
}

export interface ExtendedFiltersProps extends FiltersProps {
  searchText?: string;
  datePosted: DatePostedProps;
  [key: string]: Set<string> | string | undefined |DatePostedProps ;
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

  const handleDatePosted = (option: DatePostedProps) => {
    setFilters((prevState) => ({
      ...prevState,
      datePosted: option,
    }));
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedFilters = { ...filters };
    updatedFilters[e.target.name] = e.target.value;
    setFilters(updatedFilters);
  };

  return { filters, handleCheckbox, handleDatePosted, handleTextChange };
};