import React, { Dispatch, SetStateAction, useState } from "react";
import { FaBuilding, FaLocationArrow } from "react-icons/fa";
import { MdClose, MdError } from "react-icons/md";
import Button from "../ui/Button";
import { GoLocation } from "react-icons/go";
import { axiosPrivate } from "../../lib/api";
import { toast } from "react-toastify";

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
  canMessage: Boolean;
};

export type JobModalProps = JobProps & {
  setShowJobDetails: Dispatch<SetStateAction<boolean>>;
};

const JobModal = ({
  _id: adId,
  title,
  postedBy,
  description,
  company,
  location,
  setShowJobDetails,
  canMessage,
}: JobModalProps) => {
  console.log(canMessage);
  const [message, setMessage] = useState("I am interested in this job.");
  const [error, setError] = useState("");
  const handleSend = async () => {
    if (message) {
      const res = await axiosPrivate.post("/user/postmessage", {
        adId,
        messageText: message,
      });
      toast.success("Message Sent");
      console.log(res.data);
    } else {
      setError("Please enter the message");
    }
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
      <div className="w-full max-w-2xl relative m-auto border border-gray-400 bg-white rounded-xl p-6 shadow-lg">
        <MdClose
          onClick={(e) => {
            e.stopPropagation();
            setShowJobDetails(false);
          }}
          className="absolute text-2xl font-bold right-4 top-4 cursor-pointer text-gray-600 hover:text-black"
        />
        <div className="text-3xl font-semibold mb-6">{title}</div>
        <div className="text-lg text-gray-700 mb-4">
          <span className="font-semibold">Posted By:</span> {postedBy}
        </div>
        <div className="text-lg font-semibold mb-2">Description:</div>
        <div className="text-gray-700 mb-6">{description}</div>
        <div className="text-lg flex items-center mb-4">
          <FaBuilding className="mr-2 text-gray-600" /> {company}
        </div>
        <div className="text-lg flex items-center mb-6">
          <GoLocation className="mr-2 text-gray-600" /> {location}
        </div>
        {canMessage && (
          <div className="p-4 border border-gray-300 rounded-lg flex flex-col items-center gap-4 bg-gray-50">
            <textarea
              className="p-3 w-full border border-gray-300 rounded-lg outline-none focus:border-blue-500"
              value={message}
              rows={4}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
            />
            {error && (
              <div className="bg-red-100 p-3 w-full rounded-lg text-red-600 flex items-center justify-center gap-2">
                <MdError className="text-red-600" />
                {error}
              </div>
            )}
            <button
              onClick={handleSend}
              className="w-full py-2 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobModal;
