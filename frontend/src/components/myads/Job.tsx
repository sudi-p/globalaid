import React, { useState } from "react";
import {
  FaBriefcase,
  FaBuilding,
  FaEnvelope,
  FaMoneyBillWave,
  FaPhone,
} from "react-icons/fa6";
import IconText from "../ui/IconText";
import { MdLocationOn } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";

type JobAdProps = {
  email: string;
  isOwner: boolean;
  salary: number;
  phone: string;
  location: string;
  company: string;
};
type JobProps = {
  ad: JobAdProps;
};
const Job = ({
  ad: { email, isOwner, salary, phone, location, company },
}: JobProps) => {
  const [edit, setEdit] = useState(false);
  return (
    <div className="flex-1 flex flex-col gap-4 rounded border border-solid border-gray-300 p-4 w-96">
      <div className="text-xl border-0 border-b border-solid border-gray-300 pb-2 mb-2 flex justify-between">
        <p>
          <FaBriefcase /> Job Details
        </p>
        <div onClick={() => setEdit(true)} className="text-green-300">
          Edit
        </div>
      </div>
      <IconText text={company} icon=<FaBuilding /> color="maroon" />
      <IconText text={phone} icon=<FaPhone /> color="green" />
      <IconText text={email} icon=<FaEnvelope /> color="blue" />
      <IconText text={`${salary}`} icon=<FaMoneyBillWave /> color="green" />
      <IconText text={location} icon=<MdLocationOn /> />
      <IconText text={isOwner ? "Owner" : "Not Owner"} icon=<IoPersonSharp /> />
    </div>
  );
};

export default Job;
