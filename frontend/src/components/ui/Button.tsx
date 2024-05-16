import React, { ReactNode } from "react";

type ButtonProps = {
  handleClick: () => void;
  children: ReactNode;
  activeClassName?: string;
};

const Button = ({ handleClick, children, activeClassName }: ButtonProps) => {
  return (
    <div
      onClick={handleClick}
      className={`p-2 h-max w-max cursor-pointer border border-solid border-gray-300 rounded-2xl ${activeClassName}`}
    >
      {children}
    </div>
  );
};

export default Button;
