import React, { useState } from "react";
import Button from "@components/ui/Button";
import { IoFilterSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import FilterCheckBox from "./FilterCheckBox";
import { FiltersProps, useFilter } from "./hooks/useFilter";
import {
  commitments,
  datePostedOptions,
  jobSites,
} from "@utils/constants/jobsFilter";
import styles from "./styles/Filter.module.scss";

type FilterProps = {
  filters: FiltersProps;
  handleDatePosted: (type: string) => void;
  handleCheckbox: (name: string, checked: boolean, label: string) => void;
};

export default function Filter({
  filters,
  handleCheckbox,
  handleDatePosted,
}: FilterProps) {
  const [showFilters, handleShowFilter] = useState(true);
  const [searchText, setSearchText] = useState("");
  const clearFilters = () => {
    // Implement clearFilters logic if needed
  };
  console.log(filters);
  return (
    <div>
      <div className="flex p-4 justify-center items-center gap-3">
        <input
          placeholder="Search For Jobs"
          className="p-2 rounded border border-gray-100 w-72"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button handleClick={() => handleShowFilter(!showFilters)}>
          <IoFilterSharp /> Filter
        </Button>
        <Button handleClick={() => handleShowFilter(!showFilters)}>
          <MdDelete /> Delete Filter
        </Button>
      </div>
      {/* <div className="flex">
        {!!filters.size &&
          Array.from(filters).map((selectedFilter) => {
            return (
              <div
                key={selectedFilter}
                className="p-2 mr-4 text-blue-400 flex items-center gap-2 border border-solid border-blue-400 rounded-3xl"
              >
                {selectedFilter} <IoMdClose />
              </div>
            );
          })}
      </div> */}
      {showFilters && (
        <div
          className={`${
            showFilters ? styles.filters : ""
          } flex gap-4 p-4 rounded-lg border border-solid border-rounded border-gray-400 my-4`}
        >
          <FilterCheckBox
            title="Commitment"
            options={commitments}
            filters={filters}
            handleCheckbox={handleCheckbox}
          />
          <FilterCheckBox
            title="Workplace Type"
            checkboxes={jobSites}
            filters={filters}
            handleCheckbox={handleCheckbox}
          />
          <div className="w-80">
            <div className="font-semibold mb-4 text-xl">Date Posted</div>
            <div className="flex flex-wrap gap-3">
              {datePostedOptions.map((type) => (
                <button
                  key={type}
                  onClick={() => handleDatePosted(type)}
                  className={`w-36 cursor-pointer rounded-3xl p-2 text-center ${
                    filters.datePosted === type
                      ? "bg-blue-400 text-white border-0"
                      : "border border-solid border-blue-400"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
