import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "@components/ui/Button";
import { IoFilterSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import FilterCheckBox from "./FilterCheckBox";
import { FiltersProps, ExtendedFiltersProps } from "@hooks/useJobsFilter";
import {
  commitments,
  datePostedOptions,
  jobSites,
} from "@utils/constants/jobs";
import styles from "./styles/Filter.module.scss";

type FilterProps = {
  filters: ExtendedFiltersProps;
  handleDatePosted: (type: string) => void;
  handleCheckbox: (
    e: ChangeEvent<HTMLInputElement>,
    value: string,
    filterType: keyof FiltersProps
  ) => void;
  handleTextChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Filter({
  filters,
  handleCheckbox,
  handleDatePosted,
  handleTextChange,
}: FilterProps) {
  const [showFilters, setShowFilter] = useState(false);
  const [showFilterAnimation, setShowFilterAnimation] = useState(false);
  return (
    <div>
      <div className="flex p-4 justify-center items-center gap-3">
        <input
          placeholder="Search For Jobs"
          className="p-3 rounded outline-none border w-96 border-solid border-gray-300 active:border-gray-500"
          value={filters["searchText"]}
          name="searchText"
          onChange={(e) => handleTextChange(e)}
        />
        <Button
          handleClick={() => {
            setShowFilter(!showFilters);
            setShowFilterAnimation(true);
          }}
          activeClassName={`${
            showFilters &&
            "bg-blue-300 text-white transition-all duration-75 ease-in"
          }`}
        >
          <IoFilterSharp /> Filters
        </Button>
      </div>
      {showFilterAnimation && (
        <div
          className={`${
            showFilters ? styles.filters : styles.removing
          } flex gap-4 justify-evenly rounded-lg`}
        >
          <FilterCheckBox
            title="Commitment"
            filterType="commitment"
            options={commitments}
            filters={filters}
            handleCheckbox={handleCheckbox}
          />
          <FilterCheckBox
            title="Workplace Type"
            filterType="workplaceType"
            options={jobSites}
            filters={filters}
            handleCheckbox={handleCheckbox}
          />
          <div className="w-80">
            <div className="font-semibold mb-4 text-xl">Date Posted</div>
            <div className="flex flex-wrap gap-3">
              {datePostedOptions.map(({ label }) => (
                <button
                  key={label}
                  onClick={() => handleDatePosted(label)}
                  className={`w-36 cursor-pointer rounded-3xl p-2 text-center ${
                    filters.datePosted === label
                      ? "bg-blue-400 text-white border-0"
                      : "border border-solid border-gray-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
