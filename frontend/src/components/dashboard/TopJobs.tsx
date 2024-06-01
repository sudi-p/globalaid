import React from "react";
import { Paper, Button } from "@mui/material";
import Link from "next/link";

export type TopJobProps = {
  id: string;
  title: string;
  salary: number;
  location: string;
  description: string;
  jobType: string;
};

type TopJobsProps = {
  jobs: TopJobProps[];
};

export default function TopJobs({ jobs }: TopJobsProps) {
  return (
    <Paper>
      <div className="p-5 w-11/12 m-auto max-w-screen-xl">
        <div className="text-2xl mb-5 flex justify-between">
          <div>Top Jobs</div>
          <Link
            href="/jobs/"
            className="text-green-400 text-lg no-underline hover:font-semibold"
          >
            View More
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
      <div className="p-5 cursor-pointer shadow-md rounded-lg border border-solid border-gray-300 transition duration-300 ease-in-out transform hover:scale-105">
        <div className="flex justify-between">
          <div className="w-44">
            <span className="block text-xl font-semibold">{title}</span>
            <span className="text-gray-500 text-sm">
              {location} | {jobType}
            </span>
          </div>
          <div className="font-semibold">${salary}/Hour</div>
        </div>
        <p className="h-[5rem] overflow-hidden text-sm leading-relaxed">
          {description.slice(0, 120)}
          {description.length > 120 && "..."}
        </p>
        <Button fullWidth size="small" variant="contained" color="primary">
          Learn More
        </Button>
      </div>
    </div>
  );
}
