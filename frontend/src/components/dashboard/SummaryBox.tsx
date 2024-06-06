import React, { ReactNode } from "react";
type SummaryBoxProps = {
  number: number;
  title: string;
  icon?: ReactNode;
};
const SummaryBox = ({ number, title, icon }: SummaryBoxProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-32 w-32 border-2 border-solid border-gray-400 rounded-lg text-gray-500">
      <div className="text-3xl">{icon}</div>
      <div className="font-semibold">
        {number} {title}
      </div>
    </div>
  );
};

export default SummaryBox;
