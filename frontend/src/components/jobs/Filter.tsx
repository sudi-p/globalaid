import React, { ChangeEvent, useState } from "react";
import Button from "@components/ui/Button";
import { IoFilterSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import FilterCheckBox from "./FilterCheckBox";
import { FiltersProps, ExtendedFiltersProps } from "../../hooks/useJobsFilter";
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
    label: string,
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
  const [showFilters, handleShowFilter] = useState(true);
  return (
    <div>
      <div className="flex p-4 justify-center items-center gap-3">
        <input
          placeholder="Search For Jobs"
          className="p-2 rounded border border-gray-100 w-72"
          value={filters["searchText"]}
          name="searchText"
          onChange={(e) => handleTextChange(e)}
        />
        <Button handleClick={() => handleShowFilter(!showFilters)}>
          <IoFilterSharp /> Filter
        </Button>
        <Button handleClick={() => handleShowFilter(!showFilters)}>
          <MdDelete /> Delete Filter
        </Button>
      </div>
      {showFilters && (
        <div
          className={`${
            showFilters ? styles.filters : ""
          } flex gap-4 p-4 rounded-lg border border-solid border-rounded border-gray-400 m-4`}
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
