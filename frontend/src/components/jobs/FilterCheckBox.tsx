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
  handleCheckbox: (event: ChangeEvent<HTMLInputElement>, label: string) => void;
};
const FilterCheckBox = ({
  title,
  checkboxes,
  handleCheckbox,
}: FilterCheckBoxProps) => {
  return (
    <FormGroup className="relative w-64">
      <div className="font-semibold mb-4 text-xl">{title}</div>
      <div className="flex flex-wrap">
        {checkboxes.map(({ label, value, name }) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={!!value}
                onChange={(e) => handleCheckbox(e, label)}
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
