import React, { ReactElement, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { axiosPrivate } from "../../lib/api";
import PageNotFound from '@pages/404';
import NavbarLayout from '@components/layout/navBarLayout';
import { useQuery } from '@tanstack/react-query';

export default function MyAd() {
  const { query } = useRouter();
  const { adId } = query;
  const { data, error, isLoading } = useQuery({
    queryKey: ["myads", "adId"],
    queryFn: async () => {
      const res = await axiosPrivate.get('/user/getmyad/', {
        params: {
          adId: adId,
        }
      })
      return res.data;
    },
    enabled: !!adId
  })

  if (error) return <PageNotFound />
  if (isLoading) return <div>Loading...</div>
  const { ad: { title, description, email, phone, company } } = data;
  console.log(description)
  return (
    <div className="max-w-screen-xl m-auto p-5">
      <div className="text-3xl">{title}</div>
      <div className="whitespace-pre-wrap">{description}</div>
      {phone} | {email}
      <div>{company}</div>
    </div>
  )
}

MyAd.getLayout = function getLayout(page: ReactElement) {
  return <NavbarLayout>{page}</NavbarLayout>
}
