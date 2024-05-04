import React, { ReactNode, useEffect } from "react";
import NavbarLayout from "@components/layout/navBarLayout/";
import Hero from "../components/dashboard/Hero";
import TopRentals from "../components/dashboard/TopRentals";
import TopJobs from "../components/dashboard/TopJobs";
import axios from "@lib/api";

export default function DashboardContainer(props) {
  const { topJobs, topRentals } = props;
  return (
    <div>
      <Hero />
      <TopRentals rentals={topRentals} />
      <TopJobs jobs={topJobs} />
    </div>
  );
}

export async function getServerSideProps() {
  const res = await axios.get("/user/gettoprentalsjobs");
  const { topJobs, topRentals } = res?.data;
  return {
    props: {
      topJobs,
      topRentals,
    },
  };
}

DashboardContainer.getLayout = function getLayout(page: ReactNode) {
  return <NavbarLayout>{page}</NavbarLayout>;
};
