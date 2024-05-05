import React from "react";
import { Paper, Button } from "@mui/material";
import Link from "next/link";
import { TopJobProps } from "@store/slices/DashboardSlice";

type TopJobsProps = {
  jobs: TopJobProps[];
};

export default function TopJobs({ jobs }: TopJobsProps) {
  return (
    <Paper>
      <div className="p-5 w-11/12 m-auto max-w-screen-xl">
        <div className="text-2xl mb-5 flex justify-between">
          <div>Top Jobs</div>
          <Link href="/jobs/">
            <a className="text-green-400 text-lg no-underline">View More</a>
          </Link>
        </div>
        <div className="flex flex-wrap justify-center m-auto box-border sm:gap-5">
          {jobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
      </div>
    </Paper>
  );
}

type JobCardProps = {
  id: string;
  title: string;
  location: string;
  jobType: string;
  salary: number;
  description: string;
};

function JobCard({
  title,
  location,
  jobType,
  salary,
  description,
}: JobCardProps) {
  return (
    <div className="w-full sm:w-[calc(50%-10px)] xl:w-[calc(25%-15px)] mb-4 sm:mb-0">
      <Paper className="p-5 cursor-pointer brightness-95 hover:brightness-100">
        <div className="flex justify-between">
          <div className="w-44">
            <span className="block text-lg font-bold">{title}</span>
            <span className="text-gray-400">
              {location} | {jobType}
            </span>
          </div>
          <div className="font-bold">${salary}/Hour</div>
        </div>
        <p className="h-[4.1rem] overflow-hidden w-full leading-snug">
          {description.slice(0, 110)}...
        </p>
        <Button fullWidth size="small" variant="outlined">
          {" "}
          Learn More
        </Button>
      </Paper>
    </div>
  );
}
