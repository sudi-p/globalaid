import React, { ReactElement, ReactNode } from "react";
import { useRouter } from "next/router";
import { axiosPrivate } from "../../lib/api";
import PageNotFound from "@pages/404";
import NavbarLayout from "@components/layout/navBarLayout";
import { useQuery } from "@tanstack/react-query";
import Rental from "@src/components/myads/Rental";
import { Link } from "@mui/material";
import Job from "@src/components/myads/Job";
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
    ad: { title, description, complete, company, adType },
  } = data;
  console.log(data);
  return (
    <div className="max-w-screen-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold mb-6 text-gray-800">{title}</h2>
      </div>
      {adType == "rent" ? (
        <AdTypeButton text="Rental" icon={<HomeIcon />} />
      ) : (
        <AdTypeButton text="Job Vacancy" icon={<EngineeringIcon />} />
      )}
      <div className="text-base mb-8 whitespace-pre-wrap text-gray-700">
        <p className="font-semibold">Description:</p>
        {description}
      </div>

      {complete ? (
        <div>
          {adType === "rent" ? <Rental {...data} /> : <Job {...data} />}
        </div>
      ) : (
        <div className="text-xl text-gray-500 mt-4 border border-dotted border-gray-300 w-max p-8 m-auto center flex flex-col items-center justify-center gap-3">
          This ad is incomplete. <br />
          <span>
            Please
            <Link
              href={`/myads/createad/${adId}`}
              className="text-green-300 no-underline mx-1"
            >
              click here
            </Link>{" "}
            to complete the ad.
          </span>
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
      className={`h-12 border border-solid flex items-center p-6 rounded text-md border-green-300 w-max text-green-300 text-xl font-bold`}
    >
      {icon} <span className="ml-1">{text}</span>
    </div>
  );
}
