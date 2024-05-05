import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
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
  const [showCheckBoxes, setShowCheckBoxes] = useState(false);
  return (
    <FormGroup className="relative">
      <div
        onClick={() => setShowCheckBoxes((prev) => !prev)}
        className="w-36 flex items-center justify-between"
      >
        {title} {showCheckBoxes ? <FaAngleUp /> : <FaAngleDown />}
      </div>
      <div className="absolute top-7 flex flex-col border border-solid border-gray-300">
        {showCheckBoxes &&
          checkboxes.map(({ label, value, name }) => (
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
