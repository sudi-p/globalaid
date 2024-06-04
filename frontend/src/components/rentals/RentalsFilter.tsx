import React, { ChangeEvent, useState } from "react";
import SelectSection from "./SelectSection";
import {
  bathOptions,
  bedOptions,
  rentalTypes as rentalTypeOptions,
} from "@src/utils/constants/rentals";
import useRentalsFilter from "@src/hooks/useRentalsFilter";

const RentalsFilter = () => {
  const { selectedFilter, handleSelectButton, handleTextChange } =
    useRentalsFilter();
  const { searchText, beds, baths, rentalTypes } = selectedFilter;
  const [showBeds, setShowBeds] = useState(true);
  const [showBaths, setShowBaths] = useState(true);
  const [showRentalTypes, setShowRentalTypes] = useState(true);
  return (
    <div className="flex flex-col w-80">
      <p className="text-2xl font-bold">Filters</p>
      <input
        placeholder="Search For Rentals"
        className="p-3 mb-4 rounded-lg relative outline-none border border-solid border-gray-300 active:border-gray-500"
        value={searchText}
        name="searchText"
        onChange={(e) => handleTextChange(e)}
      />
      <SelectSection
        handleClick={() => setShowBeds(!showBeds)}
        title="Beds"
        options={bedOptions}
        showOptions={showBeds}
        filterType="beds"
        filter={beds}
        handleSelectButton={handleSelectButton}
      />
      <SelectSection
        handleClick={() => setShowBaths(!showBaths)}
        title="Baths"
        options={bathOptions}
        showOptions={showBaths}
        filterType="baths"
        filter={baths}
        handleSelectButton={handleSelectButton}
      />
      <SelectSection
        handleClick={() => setShowRentalTypes(!showRentalTypes)}
        title="Rental Type"
        options={rentalTypeOptions}
        showOptions={showRentalTypes}
        filterType="rentalTypes"
        filter={rentalTypes}
        handleSelectButton={handleSelectButton}
      />
    </div>
  );
};

export default RentalsFilter;
