import { axiosPrivate } from "@src/lib/api";
import { useQuery } from "@tanstack/react-query";
import React, { ReactNode, useState } from "react";
import PageNotFound from "./404";
import NavbarLayout from "@src/components/layout/navBarLayout";

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
  const { ads } = data;
  const completedAds = ads.filter((ad) => ad.complete);
  const incompleteAds = ads.filter((ad) => !ad.complete);
  let displayAds = incompleteAds;
  if (isCompleteList) displayAds = completedAds;
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <div>
        <div className="p-6 border-2 border-solid border-gray-400 rounded-lg w-max">
          <div className="text-xl">{ads.length}</div>
          Ads
        </div>
      </div>
      <div className="flex my-4 gap-3">
        <StatusButton
          text="Active Ads"
          active={isCompleteList}
          handleClick={() => setIsCompleteList(true)}
        />
        <StatusButton
          text="InActive Ads"
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
            </tr>
          </thead>
          <tbody className="border border-solid border-gray-300">
            {displayAds.map((ad) => {
              const { complete, title, description, adType, details } = ad;
              return (
                <tr key={ad._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b border-gray-200">
                    {title}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
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
      className={`px-4 py-2 rounded  border border-b-4 border-solid transition ease-in duration-500 border-gray-200 tranform hover:scale-105 ${
        active
          ? "border-b-green-400 border-b-2 font-semibold"
          : "border-b-gray-500"
      }`}
    >
      {text}
    </button>
  );
};
