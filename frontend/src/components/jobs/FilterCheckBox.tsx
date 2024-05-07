import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { ChangeEvent, useState } from "react";

type CheckBoxProps = {
  label: string;
  value: boolean;
  name: string;
};

type FilterCheckBoxProps = {
  title: string;
  checkboxes: Array<CheckBoxProps>;
  handleCheckbox: (event: ChangeEvent<HTMLInputElement>) => void;
};
const FilterCheckBox = ({
  title,
  checkboxes,
  handleCheckbox,
}: FilterCheckBoxProps) => {
  return (
    <FormGroup className="relative w-64">
      <div className="text-center">{title}</div>
      <div className="flex flex-wrap">
        {checkboxes.map(({ label, value, name }) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={!!value}
                onChange={handleCheckbox}
                name={name}
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
