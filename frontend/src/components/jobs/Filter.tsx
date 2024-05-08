import React, { ChangeEvent, useState } from "react";
import FilterCheckBox from "./FilterCheckBox";
import Button from "@components/ui/Button";
import styles from "./styles/Filter.module.scss";

import { IoFilterSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

type FiltersProps = {
  fullTime: boolean;
  partTime: boolean;
  weekEnds: boolean;
  permanent: boolean;
  temporary: boolean;
  casual: boolean;
  onSite: boolean;
  remote: boolean;
  hybrid: boolean;
  datePosted: string;
};

type FilterProps = {
  filters: FiltersProps;
  setFilters: React.Dispatch<React.SetStateAction<FiltersProps>>;
};

export default function Filter({ filters, setFilters }: FilterProps) {
  const [selectedFilters, setSelectedFilters] = useState(new Set());
  const [showFilters, handleShowFilter] = useState(true);
  const [searchText, setSearchText] = useState("");
  const clearFilters = () => {
    setSelectedFilters(new Set());
    setFilters({
      fullTime: false,
      partTime: false,
      weekEnds: false,
      permanent: false,
      temporary: false,
      casual: false,
      onSite: false,
      remote: false,
      hybrid: false,
      datePosted: "Any",
    });
  };
  const handleCheckbox = (
    event: ChangeEvent<HTMLInputElement>,
    label: string
  ) => {
    const { name, checked } = event.target;
    const newSelectedFilters = new Set(selectedFilters);
    if (newSelectedFilters.has(label)) newSelectedFilters.delete(label);
    else newSelectedFilters.add(label);
    setSelectedFilters(newSelectedFilters);
    setFilters((prevState) => {
      return {
        ...prevState,
        [name]: checked,
      };
    });
  };
  const handleDatePosted = (type: string) => {
    setFilters((prevState) => {
      return {
        ...prevState,
        datePosted: type,
      };
    });
    const newSelectedFilters = new Set(selectedFilters);
    if (newSelectedFilters.has(type)) newSelectedFilters.delete(type);
    else newSelectedFilters.add(type);
    setSelectedFilters(newSelectedFilters);
  };
  const {
    fullTime,
    partTime,
    permanent,
    temporary,
    casual,
    onSite,
    remote,
    hybrid,
    datePosted,
  } = filters;
  const commitments = [
    { label: "Full Time", value: fullTime, name: "fullTime" },
    { label: "Part Time", value: partTime, name: "partTime" },
    { label: "Permanent", value: permanent, name: "permanent" },
    { label: "Temporary", value: temporary, name: "temporary" },
    { label: "Casual", value: casual, name: "casual" },
  ];
  const datePostedOptions = [
    "Any",
    "Past 24 Hours",
    "Past 3 Days",
    "Past Week",
    "Past Month",
    "Past 3 Months",
  ];
  const jobSites = [
    { label: "Onsite", value: onSite, name: "onSite" },
    { label: "Remote", value: remote, name: "remote" },
    { label: "Hybrid", value: hybrid, name: "hybrid" },
  ];
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
      <div className="flex">
        {!!selectedFilters.size &&
          Array.from(selectedFilters).map((selectedFilter) => {
            return (
              <div className="p-2 mr-4 text-blue-400 flex items-center gap-2 border border-solid border-blue-400 rounded-3xl">
                {selectedFilter} <IoMdClose />
              </div>
            );
          })}
      </div>
      {showFilters && (
        <div
          className={`${
            showFilters ? styles.filters : ""
          } flex gap-4 p-4 rounded-lg border border-solid border-rounded border-gray-400 my-4`}
        >
          <FilterCheckBox
            title="Commitment"
            checkboxes={commitments}
            handleCheckbox={handleCheckbox}
          />
          <FilterCheckBox
            title="Workplace Type"
            checkboxes={jobSites}
            handleCheckbox={handleCheckbox}
          />
          <div className="w-80">
            <div className="font-semibold mb-4 text-xl">Date Posted</div>
            <div className="flex flex-wrap gap-3">
              {datePostedOptions.map((type) => (
                <button
                  onClick={() => handleDatePosted(type)}
                  className={`w-36 cursor-pointer rounded-3xl p-2 text-center border-0 ${
                    datePosted == type
                      ? "bg-blue-400 text-white border-0"
                      : "border border-solid border-gray-400"
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
