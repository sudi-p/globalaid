import Button from "@components/ui/Button";

export default {
  title: "Button",
  component: Button,
  argTypes: { handleClick: { action: "handleClick" } },
};
const Template = (args) => <Button {...args} />;
export const AlertHello = Template.bind({});
AlertHello.args = {
  handleClick: () => alert("Hello"),
  children: "Say Hello!",
};
