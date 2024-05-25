import React, { ReactElement, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { axiosPrivate } from "../../lib/api";
import PageNotFound from "@pages/404";
import NavbarLayout from "@components/layout/navBarLayout";
import { useQuery } from "@tanstack/react-query";
import Rental from "@src/components/myads/Rental";

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
    ad: { title, description, email, phone, company, adType },
  } = data;
  console.log(data);
  return (
    <div className="max-w-screen-xl m-auto p-5">
      <div className="text-3xl">{title}</div>
      <div className="whitespace-pre-wrap">{description}</div>
      {phone} | {email}
      {adType == "rent" ? <Rental {...data} /> : <div>Job</div>}
    </div>
  );
}

MyAd.getLayout = function getLayout(page: ReactElement) {
  return <NavbarLayout>{page}</NavbarLayout>;
};
