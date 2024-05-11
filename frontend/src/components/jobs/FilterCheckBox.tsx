import {
  ExtendedFiltersProps,
  FiltersProps,
  HandleCheckBoxProps,
} from "@hooks/useFilter";
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
    label: string,
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
    <FormGroup className="relative w-64">
      <div className="font-semibold mb-4 text-xl">{title}</div>
      <div className="flex flex-wrap">
        {options?.map(({ label, value }) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={filters[filterType]?.has(label)}
                onChange={(e) => handleCheckbox(e, label, filterType)}
              />
            }
            label={label}
            key={label}
          />
        ))}
      </div>
    </FormGroup>
  );
};

export default FilterCheckBox;
