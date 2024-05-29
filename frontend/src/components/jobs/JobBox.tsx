import "react";
import Link from "next/link";
import { FaBuilding, FaPhone } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { GoLocation } from "react-icons/go";
import { ReactNode, useState } from "react";
import JobModal, { JobProps } from "./JobModal";

const keyList = [{ text: "email", icon: <GoLocation /> }];
const JobBox = ({ job }: { job: JobProps }) => {
  const { _id, description, title, company, location, email, phone } = job;
  const [showJobDetails, setShowJobDetails] = useState(false);
  return (
    <div
      className={`w-76 p-5 flex flex-col gap-3 no-underline rounded-lg border border-solid border-gray-400 text-gray-700 hover:bg-gray-100 cursor-pointer`}
      onClick={() => setShowJobDetails(true)}
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
      {showJobDetails && (
        <JobModal {...job} setShowJobDetails={setShowJobDetails} />
      )}
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
