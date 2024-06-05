import { ReactNode } from "react";

type IconTextProps = {
  icon: ReactNode;
  text: string;
  color?: string;
};

const IconText = ({ icon, text, color }: IconTextProps) => {
  return (
    <div className="flex items-center gap-2 ">
      <div style={{ color: color }}>{icon}</div>
      {text}
    </div>
  );
};

export default IconText;
