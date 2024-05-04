import React, { ReactElement, ReactNode, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Chip, Stack, Paper } from "@mui/material";
import axios, { axiosPrivate } from "@lib/api";
import NavbarLayout from "@components/layout/navBarLayout/";
import Filter from "../components/jobs/Filter";
import SearchBar from "../components/jobs/SearchBar";
import JobBox, { JobProps } from "@components/jobs/JobBox";

function Jobs({ ads }) {
  const [checkbox, setCheckbox] = useState({
    fullTime: false,
    partTime: false,
    weekEnds: false,
    permanent: false,
    temporary: false,
    casual: false,
    inPerson: false,
    remote: false,
    hybrid: false,
  });
  console.log(ads);
  return (
    <div className="my-5 mx-auto max-w-screen-xl">
      <Stack direction="row" spacing={"20px"}>
        <Filter checkbox={checkbox} setCheckbox={setCheckbox} />
        <JobsList jobs={ads} />
      </Stack>
    </div>
  );
}

type JobsListProps = {
  jobs: JobProps[];
};

const JobsList = ({ jobs }: JobsListProps) => {
  return (
    <Stack spacing={"20px"} className="flex-1">
      <SearchBar />
      <Paper elevation={0} variant="outlined" className="flex-1 p-5">
        <Stack direction="row" flexWrap={"wrap"} gap="15px">
          {jobs && jobs.map((job) => <JobBox key={job._id} {...job} />)}
          {jobs && jobs.map((job) => <JobBox key={job._id} {...job} />)}
          {jobs && jobs.map((job) => <JobBox key={job._id} {...job} />)}
          {jobs && jobs.map((job) => <JobBox key={job._id} {...job} />)}
        </Stack>
      </Paper>
    </Stack>
  );
};

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

export default Jobs;

Jobs.getLayout = function getLayout(page: ReactElement) {
  return <NavbarLayout>{page}</NavbarLayout>;
};
