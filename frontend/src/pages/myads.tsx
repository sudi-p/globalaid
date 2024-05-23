import React, { useContext, lazy, ReactElement } from "react";
import Link from "next/link";
import { axiosPrivate } from "../lib/api";
import { Stack, Skeleton } from "@mui/material";
import {
  Home as HomeIcon,
  Engineering as EngineeringIcon,
} from "@mui/icons-material";
import NavbarLayout from "@components/layout/navBarLayout";
import PageNotFound from "@pages/404";
// import { parse } from 'cookie';
// import { GetServerSidePropsContext } from 'next';
import { useQuery } from "@tanstack/react-query";

interface AdProps {
  _id: string;
  title: string;
  description: string;
  adType: string;
  complete: boolean;
  views: number;
  price: number;
  replies: number;
}

// interface MyAdsProps {
//     ads: Ad[];
// }

export default function MyAds() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["myads"],
    queryFn: async () => {
      const res = await axiosPrivate("/user/getmyads/");
      return res.data;
    },
  });
  if (isLoading)
    return (
      <div className="max-w-screen-xl w-max m-auto p-4 flex flex-col justify-center items-center">
        <Skeleton
          className="p-4 mb-5"
          variant="rounded"
          height={20}
          width={300}
        />
        <Skeleton
          className="p-5 mb-5"
          variant="rounded"
          width={800}
          height={150}
        />
        <Skeleton
          className="p-5 mb-5"
          variant="rounded"
          width={800}
          height={150}
        />
        <Skeleton
          className="p-5 mb-5"
          variant="rounded"
          width={800}
          height={150}
        />
        <Skeleton
          className="p-5 mb-5"
          variant="rounded"
          width={800}
          height={150}
        />
      </div>
    );
  if (error) return <PageNotFound />;
  const { ads } = data;
  console.log(ads);
  return (
    <div className="max-w-screen-xl m-auto">
      <div className="text-center p-4 text-2xl font-bold">MyAds</div>
      {ads?.map((ad: AdProps) => <MyAd key={ad._id} {...ad} />)}
    </div>
  );
}

MyAds.getLayout = function getLayout(page: ReactElement) {
  return <NavbarLayout>{page}</NavbarLayout>;
};

function MyAd(ad: AdProps) {
  const {
    _id: adId,
    title,
    description,
    adType,
    complete,
    views,
    price,
    replies,
  } = ad;
  return (
    <div className="relative p-5 border border-solid border-gray-300 max-w-screen-md m-auto mb-5">
      <Stack direction={"row"} alignItems="center" spacing={1}>
        <span className="text-4xl">
          {adType === "rent" ? (
            <HomeIcon fontSize="inherit" />
          ) : (
            <EngineeringIcon fontSize="inherit" />
          )}
        </span>
        <div>
          <div className="text-xl font-semibold">{title}</div>
          <div className="whitespace-pre-wrap">{description}</div>
          <div className="text-xl">{views} Views</div>
          <div className="text-xl">{views}Replies</div>
        </div>
      </Stack>
      <Link
        href={complete ? `/myads/${adId}` : `/myads/createad/${adId}`}
        className="no-underline text-green-500 absolute bottom-5 right-5"
      >
        {complete ? "View More " : "Complete Ad"}
      </Link>
    </div>
  );
}

// export const getServerSideProps = async (context: GetServerSidePropsContext) => {
//     try {
//         console.log("getServerSideProps from myads")
//         const cookies = parse(context.req.headers.cookie || '');
//         const config = {
//             withCredentials: true,
//             headers: {
//                 Authorization: cookies?.user
//                     ? `Bearer ${JSON.parse(cookies.user).accessToken}`
//                     : undefined,
//                 Cookie: context?.req?.headers?.cookie
//             },
//         };
//         const res = await axiosPrivate.get('/user/getmyads', config);
//         return {
//             props: {
//                 ads: res?.data.ads
//             }
//         }
//     } catch (e) {
//         return {
//             notFound: true,
//         }
//     }
// }
