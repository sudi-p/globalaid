import "react";
import { FaBuilding, FaPhone } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { GoLocation } from "react-icons/go";
import { ReactNode } from "react";

export type JobProps = {
  _id: string;
  description: string;
  title: string;
  company: string;
  location: string;
  email: string;
  phone: string;
  jobType: string;
  jobSite: string;
};

const JobBox = ({
  _id,
  description,
  title,
  company,
  location,
  email,
  phone,
}: JobProps) => {
  return (
    <div
      className={`w-76 p-5 flex flex-col gap-3 rounded-lg border border-solid border-gray-400 text-gray-700 hover:bg-gray-100 cursor-pointer`}
    >
      <div className="text-xl font-bold">{title}</div>
      <IconText icon=<FaBuilding /> text={company} color="maroon" />
      {location && (
        <IconText icon=<GoLocation /> text={location} color="blue" />
      )}
      {email && <IconText icon=<CiMail /> text={email} color="green" />}
      {phone && <IconText icon=<FaPhone /> text={phone} color="gray" />}
      <div className="font-bold">Descripton:</div>
      <div className="truncate">{description}</div>
    </div>
  );
};

export default JobBox;

type IconTextProps = {
  icon: ReactNode;
  text: string;
  color?: string;
};

export const IconText = ({ icon, text, color }: IconTextProps) => {
  return (
    <div className="flex items-center gap-2 ">
      <div style={{ color: color }}>{icon}</div>
      {text}
    </div>
  );
};
