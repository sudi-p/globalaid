import "react";
import { FaBuilding, FaPhone } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { GoLocation } from "react-icons/go";
import { ReactNode, useState } from "react";
import JobModal, { JobProps } from "./JobModal";
import IconText from "../ui/IconText";

const keyList = [{ text: "email", icon: <GoLocation /> }];
const JobBox = ({ job }: { job: JobProps }) => {
  const { description, title, company, location, email, phone } = job;
  const [showJobDetails, setShowJobDetails] = useState(false);
  return (
    <>
      <div
        className={`w-76 p-5 flex flex-col gap-3 no-underline rounded-lg border border-solid border-gray-400 text-gray-700 hover:bg-gray-100 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105`}
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
      </div>
      {showJobDetails && (
        <JobModal {...job} setShowJobDetails={setShowJobDetails} />
      )}
    </>
  );
};

export default JobBox;
