import {
  ExtendedFiltersProps,
  FiltersProps,
  HandleCheckBoxProps,
} from "@hooks/useJobsFilter";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { ChangeEvent, useState } from "react";

type CheckBoxProps = {
  label: string;
  value: string;
};

type FilterCheckBoxProps = {
  title: string;
  options: Array<CheckBoxProps>;
  filterType: keyof FiltersProps;
  filters: ExtendedFiltersProps;
  handleCheckbox: (
    e: ChangeEvent<HTMLInputElement>,
    value: string,
    filterType: keyof FiltersProps
  ) => void;
};
const FilterCheckBox = ({
  title,
  options,
  filterType,
  filters,
  handleCheckbox,
}: FilterCheckBoxProps) => {
  return (
    <div className="w-64">
      <div className="font-semibold mb-4 text-xl">{title}</div>
      <div className="flex flex-wrap">
        {options?.map(({ label, value }) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={filters[filterType]?.has(value)}
                onChange={(e) => handleCheckbox(e, value, filterType)}
              />
            }
            label={label}
            key={label}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterCheckBox;
