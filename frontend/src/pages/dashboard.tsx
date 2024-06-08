import { axiosPrivate } from "@src/lib/api";
import { useQuery } from "@tanstack/react-query";
import React, { ReactNode, useState } from "react";
import PageNotFound from "./404";
import NavbarLayout from "@src/components/layout/navBarLayout";
import { MdDelete } from "react-icons/md";
import { IconButton, Link, Tooltip } from "@mui/material";
import SummaryBox from "@src/components/dashboard/SummaryBox";
import { FcAdvertising, FcSms } from "react-icons/fc";
import { FaEye } from "react-icons/fa6";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [isCompleteList, setIsCompleteList] = useState(true);
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/user/getdashboard/");
      return res.data;
    },
  });
  if (error) return <PageNotFound />;
  if (isLoading) return "Loading..";
  const { ads, conversationsCount } = data;
  const completeAds = ads.filter((ad) => ad.complete);
  const incompleteAds = ads.filter((ad) => !ad.complete);
  let displayAds = incompleteAds;
  if (isCompleteList) displayAds = completeAds;
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <div className="flex gap-3">
        <SummaryBox number={ads.length} title="Ads" icon=<FcAdvertising /> />
        <SummaryBox
          number={conversationsCount}
          title="Replies"
          icon=<FcSms />
        />
        <SummaryBox number={300} title="Views" icon=<FaEye color="maroon" /> />
      </div>
      <div className="flex my-4">
        <StatusButton
          text={`Active Ads (${completeAds.length})`}
          active={isCompleteList}
          handleClick={() => setIsCompleteList(true)}
        />
        <StatusButton
          text={`InActive Ads (${incompleteAds.length})`}
          active={!isCompleteList}
          handleClick={() => setIsCompleteList(false)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">Title</th>
              <th className="py-2 px-4 border-b border-gray-200">
                Description
              </th>
              <th className="py-2 px-4 border-b border-gray-200">Type</th>
              <th className="py-2 px-4 border-b border-gray-200">Details</th>
              <th className="py-2 px-4 border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody className="border border-solid border-gray-300">
            {displayAds.map((ad) => {
              const { _id, complete, title, description, adType, details } = ad;
              return (
                <tr
                  key={_id}
                  className="border border-b border-gray-400 hover:bg-gray-50"
                >
                  <td className="py-2 px-4 ">
                    <Link
                      href={`/myads/${_id}/`}
                      className="no-underline font-semibold text-lg"
                    >
                      {title}
                    </Link>
                  </td>
                  <td className="py-2 px-4 w-96 border-b border-gray-200">
                    {description}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 capitalize">
                    {adType}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {details ? (
                      ad.adType === "job" ? (
                        <div className="text-sm">
                          <p>
                            <strong>Company:</strong> {details.company}
                          </p>
                          <p>
                            <strong>Job Type:</strong> {details.jobType}
                          </p>
                          <p>
                            <strong>Salary:</strong> {details.salary}
                          </p>
                          <p>
                            <strong>Job Site:</strong> {details.jobSite}
                          </p>
                        </div>
                      ) : (
                        <div className="text-sm">
                          <p>
                            <strong>Bedrooms:</strong> {details.bedRoom}
                          </p>
                          <p>
                            <strong>Rent:</strong> {details.rent}
                          </p>
                          <p>
                            <strong>Washrooms:</strong> {details.washRoom}
                          </p>
                          <p>
                            <strong>Rental Type:</strong> {details.rentalType}
                          </p>
                        </div>
                      )
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>
                    <Tooltip title="Delete">
                      <IconButton>
                        <MdDelete />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Dashboard.getLayout = function getLayout(page: ReactNode) {
  return <NavbarLayout>{page}</NavbarLayout>;
};
export default Dashboard;

type StatusButtonProps = {
  text: string;
  active: boolean;
  handleClick: () => void;
};
const StatusButton = ({ text, active, handleClick }: StatusButtonProps) => {
  return (
    <button
      onClick={handleClick}
      className={`px-5 py-3 border border-b-4 border-solid transition ease-in duration-500 border-gray-200 tranform  ${
        active
          ? "border-b-green-400 border-b-2 font-semibold"
          : "border-b-gray-500 hover:scale-105"
      }`}
    >
      {text}
    </button>
  );
};
