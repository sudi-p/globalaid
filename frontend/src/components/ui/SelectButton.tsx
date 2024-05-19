import React, { ReactNode } from "react";
import { HandleSelectButtonProps } from "../rentals/RentalsFilter";

type SelectButtonProps = {
  text: string;
  icon?: ReactNode;
  active?: boolean;
  activeColor?: string;
  handleClick: () => void;
};

const SelectButton = ({
  text,
  icon,
  active,
  activeColor,
  handleClick,
}: SelectButtonProps) => {
  return (
    <div
      style={{
        borderColor: active ? activeColor : "",
        color: active ? activeColor : "",
      }}
      onClick={handleClick}
      className={`px-4 py-2 w-max border border-solid border-gray-300 rounded-lg cursor-pointer`}
    >
      {icon} {text}
    </div>
  );
};

export default SelectButton;
