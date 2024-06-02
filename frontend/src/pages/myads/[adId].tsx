import React, { ReactElement, ReactNode } from "react";
import { useRouter } from "next/router";
import { axiosPrivate } from "../../lib/api";
import PageNotFound from "@pages/404";
import NavbarLayout from "@components/layout/navBarLayout";
import { useQuery } from "@tanstack/react-query";
import Rental from "@src/components/myads/Rental";
import { Link } from "@mui/material";
import { FaPhone, FaEnvelope, FaHome, FaBriefcase } from "react-icons/fa";
import {
  Home as HomeIcon,
  Engineering as EngineeringIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

export default function MyAd() {
  const { query } = useRouter();
  const { adId } = query;
  const { data, error, isLoading } = useQuery({
    queryKey: ["myads", "adId"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/user/getmyad/", {
        params: {
          adId: adId,
        },
      });
      return res.data;
    },
    enabled: !!adId,
  });

  if (error) return <PageNotFound />;
  if (isLoading) return <div>Loading...</div>;
  const {
    ad: { title, description, complete, email, phone, company, adType },
  } = data;
  console.log(data);
  return (
    <div className="max-w-screen-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between">
        <h2 className="font-bold mb-6 text-gray-800">{title}</h2>
        {adType == "rent" ? (
          <AdTypeButton text="Rental" icon={<HomeIcon />} />
        ) : (
          <AdTypeButton text="Job Vacancy" icon={<EngineeringIcon />} />
        )}
      </div>
      <div className="text-base mb-8 whitespace-pre-wrap text-gray-700">
        <p className="font-semibold">Description:</p>
        {description}
      </div>
      <div>
        Ad Type: <span className="capitalize"> {adType}</span>
      </div>

      {complete ? (
        <div className="border-t pt-6">
          <div className="flex items-center space-x-6 text-gray-600 mb-6">
            <div className="flex items-center space-x-2">
              <FaPhone className="text-gray-500" />
              <span className="font-medium">{phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-gray-500" />
              <span className="font-medium">{email}</span>
            </div>
          </div>
          {adType === "rent" ? (
            <Rental {...data} />
          ) : (
            <div className="flex items-center space-x-2 text-xl font-semibold text-gray-700">
              <FaBriefcase />
              <span>Job Details</span>
            </div>
          )}
        </div>
      ) : (
        <div className="text-xl text-gray-500 mt-4 border border-dotted border-gray-300 w-max p-8 m-auto center">
          This ad is incomplete. <br />
          Please
          <Link
            href={`/myads/createad/${adId}`}
            className="text-blue-500 underline mx-1"
          >
            click here
          </Link>{" "}
          to complete the ad.
        </div>
      )}
    </div>
  );
}

MyAd.getLayout = function getLayout(page: ReactElement) {
  return <NavbarLayout>{page}</NavbarLayout>;
};

type AdTypeButtonProps = {
  icon: ReactNode;
  text: string;
};

function AdTypeButton({ icon, text }: AdTypeButtonProps) {
  return (
    <div
      className={`border border-solid flex items-center p-6 rounded cursor-pointer text-md border-green-300 w-max text-green-300 text-xl font-bold`}
    >
      {icon} <span className="ml-1">{text}</span>
    </div>
  );
}
