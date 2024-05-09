import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { ChangeEvent, useState } from "react";

type CheckBoxProps = {
  label: string;
  value: boolean;
};

type FilterCheckBoxProps = {
  title: string;
  options: Array<CheckBoxProps>;
  filters: Set<string>;
  handleCheckbox: (event: ChangeEvent<HTMLInputElement>, label: string) => void;
};
const FilterCheckBox = ({
  title,
  options,
  filters,
  handleCheckbox,
}: FilterCheckBoxProps) => {
  return (
    <FormGroup className="relative w-64">
      <div className="font-semibold mb-4 text-xl">{title}</div>
      <div className="flex flex-wrap">
        {options.map(({ label, value }) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={!!filters.has(label)}
                onChange={(e) => handleCheckbox(e, label)}
              />
            }
            label={label}
          />
        ))}
      </div>
    </FormGroup>
  );
};

export default FilterCheckBox;
