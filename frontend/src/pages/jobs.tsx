import React, { ReactElement } from "react";
import Fuse, { FuseResult } from "fuse.js";
import NavbarLayout from "@components/layout/navBarLayout/";
import Filter from "../components/jobs/Filter";
import JobBox, { JobProps } from "@components/jobs/JobBox";
import { ExtendedFiltersProps, useJobsFilter } from "@hooks/useJobsFilter";
import { axiosPrivate } from "@lib/api";

type JobsListProps = {
  ads: JobProps[];
  filters: ExtendedFiltersProps;
};

function Jobs({ ads }: JobsListProps) {
  const { filters, handleCheckbox, handleDatePosted, handleTextChange } =
    useJobsFilter({
      commitment: new Set(),
      workplaceType: new Set(),
      datePosted: "Any",
      searchText: "",
    });
  return (
    <div className="my-5 mx-auto max-w-screen-xl">
      <Filter
        filters={filters}
        handleCheckbox={handleCheckbox}
        handleDatePosted={handleDatePosted}
        handleTextChange={handleTextChange}
      />
      {ads.length == 0 ? (
        <ZeroJobs />
      ) : (
        <JobsList ads={ads} filters={filters} />
      )}
    </div>
  );
}

const JobsList = ({ ads: jobs, filters }: JobsListProps) => {
  const { searchText, commitment, workplaceType, datePosted } = filters;
  let displayJobs = [...jobs];
  if (searchText) {
    const fuseOptions = { keys: ["title", "description", "company"] };
    const fuse = new Fuse(jobs, fuseOptions);
    displayJobs = fuse.search(searchText!).map((result) => result.item);
  }
  if (commitment.size) {
    console.log(commitment);
    displayJobs = displayJobs.filter((job) => {
      console.log(commitment, job.jobSite, commitment.has(job.jobSite));
      return commitment.has(job.jobType);
    });
  }
  console.log(displayJobs);
  if (displayJobs.length == 0) return <ZeroFilteredJobs />;
  return (
    <div className="grid grid-cols-3 gap-10 p-10">
      {displayJobs.map((job) => (
        <JobBox key={job._id} {...job} />
      ))}
    </div>
  );
};

const ZeroFilteredJobs = () => {
  return (
    <div className="text-3xl text-center p-52">
      Sorry there are no jobs that matches your requirement at the moment.
    </div>
  );
};

const ZeroJobs = () => {
  return (
    <div className="text-3xl text-center p-52">
      Sorry there are 0 active jobs at the moment.
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
