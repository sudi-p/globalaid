import React, { ReactNode } from "react";

type ButtonProps = {
  handleClick: () => void;
  children: ReactNode;
};

const Button = ({ handleClick, children }: ButtonProps) => {
  return (
    <div
      onClick={handleClick}
      className="p-2 h-max cursor-pointer border border-solid border-gray-300 rounded-2xl"
    >
      {children}
    </div>
  );
};

export default Button;
