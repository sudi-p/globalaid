import React, { ReactElement, ReactNode, useState } from "react";
import { axiosPrivate } from "@lib/api";
import NavbarLayout from "@components/layout/navBarLayout/";
import Filter from "../components/jobs/Filter";
import JobBox, { JobProps } from "@components/jobs/JobBox";
import { useFilter } from "@components/jobs/hooks/useFilter";

type JobsListProps = {
  ads: JobProps[];
};

function Jobs({ ads }: JobsListProps) {
  const { filters, selectedFilters, handleCheckbox, handleDatePosted } =
    useFilter({
      commitment: new Set(),
      workplaceType: new Set(),
      datePosted: "Any",
    });
  console.log(selectedFilters);
  return (
    <div className="my-5 mx-auto max-w-screen-xl">
      <Filter
        filters={filters}
        handleCheckbox={handleCheckbox}
        handleDatePosted={handleDatePosted}
      />
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
