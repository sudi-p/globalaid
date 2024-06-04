import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import SelectButton from "../ui/SelectButton";
import { MdDone } from "react-icons/md";
import { RentalsFilterProps } from "@src/hooks/useRentalsFilter";

type SelectSectionProps = {
  title: string;
  options: Array<string>;
  handleClick: () => void;
  showOptions: boolean;
  filter: Set<string | unknown>;
  filterType: keyof RentalsFilterProps;
  handleSelectButton: (
    filterType: keyof RentalsFilterProps,
    value: string,
    selected: Boolean
  ) => void;
};
const SelectSection = ({
  title,
  options,
  handleClick,
  showOptions,
  filter,
  filterType,
  handleSelectButton,
}: SelectSectionProps) => {
  return (
    <div className="border border-solid border-gray-300 rounded-lg p-3 mb-4">
      <div
        onClick={handleClick}
        className="flex justify-between items-center text-xl font-semibold text-gray-700"
      >
        {title} {showOptions ? <FaAngleUp /> : <FaAngleDown />}
      </div>
      {showOptions && (
        <div className="flex gap-4 flex-wrap mt-4">
          {options.map((option) => {
            const selected = filter.has(option);
            return (
              <SelectButton
                handleClick={() =>
                  handleSelectButton(filterType, option, selected)
                }
                text={option}
                active={selected}
                key={option}
                activeColor="green"
                icon={selected && <MdDone />}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
export default SelectSection;
