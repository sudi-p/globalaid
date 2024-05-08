import React, { ReactElement, ReactNode, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Chip, Stack, Paper } from "@mui/material";
import axios, { axiosPrivate } from "@lib/api";
import NavbarLayout from "@components/layout/navBarLayout/";
import Filter from "../components/jobs/Filter";
import JobBox, { JobProps } from "@components/jobs/JobBox";

type JobsListProps = {
  ads: JobProps[];
};

function Jobs({ ads }: JobsListProps) {
  const [filters, setFilters] = useState({
    fullTime: false,
    partTime: false,
    weekEnds: false,
    permanent: false,
    temporary: false,
    casual: false,
    inPerson: false,
    remote: false,
    hybrid: false,
    datePosted: "Any",
  });
  return (
    <div className="my-5 mx-auto max-w-screen-xl">
      <Filter filters={filters} setFilters={setFilters} />
      <JobsList ads={ads} />
    </div>
  );
}

const JobsList = ({ ads: jobs }: JobsListProps) => {
  return (
    <div className="grid grid-cols-3 gap-10">
      {jobs && jobs.map((job) => <JobBox key={job._id} {...job} />)}
      {jobs && jobs.map((job) => <JobBox key={job._id} {...job} />)}
      {jobs && jobs.map((job) => <JobBox key={job._id} {...job} />)}
      {jobs && jobs.map((job) => <JobBox key={job._id} {...job} />)}
    </div>
  );
};

export default Jobs;

export const getServerSideProps = async () => {
  try {
    const res = await axiosPrivate.get("/user/getjobs");
    return {
      props: {
        ads: res?.data?.ads,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

Jobs.getLayout = function getLayout(page: ReactElement) {
  return <NavbarLayout>{page}</NavbarLayout>;
};
