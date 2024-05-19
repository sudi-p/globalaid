import SelectButton from "@components/ui/SelectButton";
import { MdDone } from "react-icons/md";
export default {
  title: "SelectButton",
  component: SelectButton,
};

const Template = (args) => <SelectButton {...args} />;
export const OneSelectButton = Template.bind({});
OneSelectButton.args = {
  text: "1",
  icon: <MdDone />,
};
