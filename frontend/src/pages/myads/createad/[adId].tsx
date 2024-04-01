import React, { ReactElement, lazy } from 'react';
import { useRouter } from 'next/router';
import { axiosPrivate } from '../../../lib/api';
import NavbarLayout from '@components/layout/navBarLayout';
const CreateJob = lazy(()=> import('../../../components/createAd/CreateJob'));
const CreateRental = lazy(()=> import('../../../components/createAd/CreateRental'));
import PageNotFound from '@pages/404';
import { GetServerSideProps } from 'next';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@mui/material';

export default function CreateAd() {
  const router = useRouter();
  const { query } = router;
  let { adId } = query;
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["createAd","adId"],
    queryFn: async() => {
      const res = await axiosPrivate.get("/user/createad", {
        params: { adId: adId}
      });
      return res.data;
    },
    enabled: !!adId,
  })
  if (error) return (<PageNotFound />);
 if (isLoading) return (
    <div className="w-[700px] p-5 m-auto">
      <Skeleton className="m-auto my-10" variant="rectangular" width={500} height={60} />
      <div className="flex justify-center items-center">
        <Skeleton variant="circular" width={50} height={50} />
        <Skeleton className="mx-3" variant="rectangular" width={100} height={10}/>
        <Skeleton variant="circular" width={50} height={50} />
        <Skeleton className="mx-3" variant="rectangular" width={100} height={10}/>
        <Skeleton variant="circular" width={50} height={50} />
      </div>
      <Skeleton className="m-auto my-10" variant="rectangular" width={700} 
      height={50} />
      <Skeleton className="m-auto my-10" variant="rectangular" width={700} 
      height={50} />
      <Skeleton className="m-auto my-10" variant="rectangular" width={700} 
      height={50} />
      <Skeleton className="m-auto my-10" variant="rectangular" width={700} 
      height={50} />
      <Skeleton className="my-10" variant="rectangular" width={400} 
      height={50} />
      <Skeleton className="m-auto my-10" variant="rectangular" width={300} 
      height={50} />
    </div>
    )
  adId = Array.isArray(adId) ? adId[0] : adId || '';
  let display;
  const { ad: createAdData} = data;
  const { adType, title:adTitle, createAdLevel } = createAdData;
  if (adType === "rent") display = <CreateRental adId={adId} createAdLevel={createAdLevel} refetch={refetch} />
  if (adType === "job") display = <CreateJob adId={adId} />
  return (
    <div className="w-[700px] p-5 m-auto">
      <div className="text-green-500 text-center text-3xl mt-3 mb-10 tracking-wide uppercase leading-tight">{adTitle}</div>
      {display}
    </div>
  )
}

CreateAd.getLayout = function getLayout(page: ReactElement) {
  return <NavbarLayout>{page}</NavbarLayout>
}