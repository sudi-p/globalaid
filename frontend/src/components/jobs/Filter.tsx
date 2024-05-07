import React, { ChangeEvent, useState } from "react";

import { IoFilterSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import SearchBar from "./SearchBar";
import FilterCheckBox from "./FilterCheckBox";
import Button from "@components/ui/Button";
import { TextField } from "@mui/material";

type CheckboxProps = {
  fullTime: boolean;
  partTime: boolean;
  weekEnds: boolean;
  permanent: boolean;
  temporary: boolean;
  casual: boolean;
  inPerson: boolean;
  remote: boolean;
  hybrid: boolean;
};

type FilterProps = {
  checkbox: CheckboxProps;
  setCheckbox: any;
};

export default function Filter({ checkbox, setCheckbox }: FilterProps) {
  const [showFilters, handleShowFilter] = useState(false);
  const clearFilters = () => {
    setCheckbox({
      fullTime: false,
      partTime: false,
      weekEnds: false,
      permanent: false,
      temporary: false,
      casual: false,
      inPerson: false,
      remote: false,
      hybrid: false,
    });
  };
  const handleCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCheckbox((prevState) => {
      return {
        ...prevState,
        [name]: checked,
      };
    });
  };
  const {
    fullTime,
    partTime,
    permanent,
    temporary,
    casual,
    inPerson,
    remote,
    hybrid,
  } = checkbox;

  return (
    <div>
      <div className="flex p-4 justify-center items-center gap-3">
        <TextField label="Search For Jobs" />
        <Button handleClick={() => handleShowFilter(!showFilters)}>
          <IoFilterSharp /> Filter
        </Button>
        <Button handleClick={() => handleShowFilter(!showFilters)}>
          <MdDelete /> Delete Filter
        </Button>
      </div>
      {showFilters && (
        <div className="flex gap-4 justify-center p-4 border border-solid border-rounded border-gray-300 transition-all duration-1000 ease-in">
          <FilterCheckBox
            title="JobSite"
            checkboxes={[
              { label: "Full-Time", value: fullTime, name: "fullTime" },
              { label: "Part-Time", value: partTime, name: "partTime" },
              { label: "Permanent", value: permanent, name: "permanent" },
              { label: "Temporary", value: temporary, name: "temporary" },
            ]}
            handleCheckbox={handleCheckbox}
          />
          <FilterCheckBox
            title="JobSite"
            checkboxes={[
              { label: "In-Person", value: inPerson, name: "inPerson" },
              { label: "Remote", value: remote, name: "remote" },
              { label: "Hybrid", value: hybrid, name: "hybrid" },
            ]}
            handleCheckbox={handleCheckbox}
          />
        </div>
      )}
    </div>
  );
}
