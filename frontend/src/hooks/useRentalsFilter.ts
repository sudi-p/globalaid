import React, { ChangeEvent, useState } from 'react'

export type RentalsFilterProps = {
  beds: Set<string>;
  baths: Set<string>;
  rentalTypes: Set<string>;
};

export type HandleSelectButtonProps = {
  filterType: keyof RentalsFilterProps;
  value: string;
  selected: Boolean;
};

const useRentalsFilter = () => {
  const [selectedFilter, setSelectedFilter] = useState({
    searchText: "",
    beds: new Set(),
    baths: new Set(),
    rentalTypes: new Set(),
  });
  const handleSelectButton = (
    filterType: keyof RentalsFilterProps,
    value: string,
    selected: Boolean
  ) => {
    const updatedFilter = { ...selectedFilter };
    if (selected) {
      updatedFilter[filterType].delete(value);
    } else {
      updatedFilter[filterType].add(value);
    }
    setSelectedFilter(updatedFilter);
  };
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedFilter = { ...selectedFilter };
    updatedFilter["searchText"] = e.target.value;
    setSelectedFilter(updatedFilter);
  };
  return { selectedFilter, handleSelectButton, handleTextChange }
}

export default useRentalsFilter;