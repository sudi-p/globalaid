import Button from "@components/ui/Button";

export default {
  title: "Button",
  component: Button,
};

export const AlertHello = () => (
  <Button handleClick={() => alert("Hello")}> Say Hello!</Button>
);
