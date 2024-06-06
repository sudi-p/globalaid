import React, { ReactNode, useEffect } from "react";
import NavbarLayout from "@components/layout/navBarLayout/";
import Hero from "../components/home/Hero";
import TopRentals, { TopRentalProps } from "../components/home/TopRentals";
import TopJobs, { TopJobProps } from "../components/home/TopJobs";
import axios from "@lib/api";

export type DashboardProps = {
  topRentals: TopRentalProps[];
  topJobs: TopJobProps[];
  status: number;
};

export default function DashboardContainer({
  topJobs,
  topRentals,
}: DashboardProps) {
  return (
    <>
      <Hero />
      <TopRentals rentals={topRentals} />
      <TopJobs jobs={topJobs} />
    </>
  );
}

export async function getServerSideProps() {
  try {
    const res = await axios.get("/user/gettoprentalsjobs");
    const { topJobs, topRentals } = res?.data;
    return {
      props: {
        topJobs,
        topRentals,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}

DashboardContainer.getLayout = function getLayout(page: ReactNode) {
  return <NavbarLayout>{page}</NavbarLayout>;
};
