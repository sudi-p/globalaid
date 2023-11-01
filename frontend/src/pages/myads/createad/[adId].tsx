import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { axiosPrivate } from '../../../lib/api';
import NavbarLayout from '@components/layout/navBarLayout';
import CreateJob from '../../../components/createAd/CreateJob';
import CreateRental from '../../../components/createAd/CreateRental';
import { GetServerSideProps } from 'next';

export default function CreateAd({ createAdData }) {
  const router = useRouter();
  const { query } = router;
  let { adId } = query;
  let display = <div>Loading</div>;
  adId = Array.isArray(adId) ? adId[0] : adId || '';

  const { adType, title:adTitle } = createAdData;
  if (adType === "rent") display = <CreateRental adId={adId} />
  if (adType === "job") display = <CreateJob adId={adId} />
  return (
    <div className="w-[700px] p-5 m-auto">
      <div className="text-green-500 text-center text-3xl mt-3 mb-10 tracking-wide uppercase leading-tight">{adTitle}</div>
      {display}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async(context) => {
  try{
    const { params } = context;
    const { adId } = params;
    const response = await axiosPrivate.get('/user/createad/', {
      params: { adId: adId }
    })
    return {
      props: {
        createAdData: response?.data?.ad
      }
    }
  } catch(e){
    return{
      notFound: true,
    }
  }
}

CreateAd.getLayout = function getLayout(page: ReactElement) {
  return <NavbarLayout>{page}</NavbarLayout>
}