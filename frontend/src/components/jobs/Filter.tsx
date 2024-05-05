import React, { ChangeEvent, useState } from "react";
import {
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Stack,
  FormLabel,
} from "@mui/material";
import SearchBar from "./SearchBar";
import FilterCheckBox from "./FilterCheckBox";

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
    <div className="flex justify-between">
      <div className="flex justify-between items-center mb-2">
        <div className="text-lg font-bold">Filter</div>
        <div onClick={clearFilters} className="cursor-pointer text-green-500">
          Reset Filters
        </div>
      </div>
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
      <SearchBar />
    </div>
  );
}
