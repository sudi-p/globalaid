import React, { ReactNode } from 'react';
import { axiosPrivate } from '../lib/api';
import Rental, { RentalProps } from '../components/rentals/Rental';
import NavbarLayout from '@components/layout/navBarLayout';

function Rentals({ rentals }: { rentals: RentalProps[]}) {
  // const rentalsQuery = useQuery({
  //   queryKey: ['rentals'],
  //   queryFn: async () => {
  //     const res = await axiosPrivate.get('/user/getrentals')
  //     return res.data
  //   }
  // });
  // const { isLoading, error, data } = rentalsQuery;
  // if (isLoading) return (<div>Loading..</div>)
  // if (error) return <PageNotFound />
  return (
    <div className="m-auto max-w-screen-xl">
      <div className="flex gap-2">
        <div>Section for filter</div>
        <div className="flex-1 p-4">
          {rentals?.map((rental: RentalProps, id:number) => {
            return (
              <Rental key={`rental${id}`} {...rental} />
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default Rentals;

export const getServerSideProps = async () => {
  // try {
    const res = await axiosPrivate.get('/user/getrentals')
    return {
      props: {
        rentals: res?.data?.rentals,
      }
    }
  // } catch (e) {
  //   return {
  //     notFound: true,
  //   };
  // }
}

Rentals.getLayout = function getLayout(page: ReactNode){
  return <NavbarLayout>{page}</NavbarLayout>
}