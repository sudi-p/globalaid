import { useState } from "react";

export type FiltersProps = {
  commitment: Set<string>;
  workplaceType: Set<string>;
  datePosted: string;
};

export const useFilter = (initialFilters: FiltersProps) => {
  const [filters, setFilters] = useState(initialFilters);
  const [selectedFilters, setSelectedFilters] = useState(new Set<string>());

  const handleCheckbox = (checked: boolean, label: string) => {
    const newSelectedFilters = new Set(selectedFilters);
    if (checked) newSelectedFilters.add(label);
    else newSelectedFilters.delete(label);
    setSelectedFilters(newSelectedFilters);
    setFilters((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleDatePosted = (type: string) => {
    setFilters((prevState) => ({
      ...prevState,
      datePosted: type,
    }));
    const newSelectedFilters = new Set(selectedFilters);
    if (newSelectedFilters.has(type)) newSelectedFilters.delete(type);
    else newSelectedFilters.add(type);
    setSelectedFilters(newSelectedFilters);
  };

  return { filters, selectedFilters, handleCheckbox, handleDatePosted };
};
