import React, { Dispatch, SetStateAction, useState } from "react";
import { FaBuilding, FaLocationArrow } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import Button from "../ui/Button";
import { GoLocation } from "react-icons/go";

export type JobProps = {
  _id: string;
  postedBy: string;
  description: string;
  title: string;
  company: string;
  location: string;
  email: string;
  phone: string;
  jobType: string;
  jobSite: string;
  createdAt: Date;
  isOwner: Boolean;
};

export type JobModalProps = JobProps & {
  setShowJobDetails: Dispatch<SetStateAction<boolean>>;
};

const JobModal = ({
  title,
  postedBy,
  description,
  company,
  location,
  setShowJobDetails,
  isOwner,
}: JobModalProps) => {
  const [message, setMessage] = useState("I am interested in this job.");
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
      <div className=" w-1/3 relative m-auto border border-solid border-gray-400 bg-white rounded-xl p-4">
        <MdClose
          onClick={(e) => {
            e.stopPropagation();
            setShowJobDetails(false);
          }}
          className="absolute text-xl font-bold right-4 top-4 hover:text-black hover:font-bold"
        />
        <div className="text-2xl mb-4">{title}</div>
        Posted By: {postedBy}
        <div>Description:</div>
        <div className="my-4">{description}</div>
        <div className="mb-4">
          <FaBuilding /> {company}
        </div>
        <div className="mb-4">
          <GoLocation /> {location}
        </div>
        <div className="p-4 border border-solid border-gray-300 rounded-lg flex flex-col items-center gap-2">
          <textarea
            className=" p-3 box-border outline-none border border-solid rounded-lg border-gray-300 w-full"
            value={message}
            rows={4}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div
            onClick={() => !isOwner && alert("message")}
            className={`border border-solid rounded-lg  p-2 text-white ${isOwner ? "cursor-not-allowed bg-blue-300" : "bg-blue-500 cursor-pointer"}`}
          >
            Send
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobModal;
