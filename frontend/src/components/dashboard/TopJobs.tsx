import React from "react";
import { Paper, Button } from "@mui/material";
import Link from "next/link";
import IconText from "../ui/IconText";
import { GoLocation } from "react-icons/go";
import { FaHelmetSafety } from "react-icons/fa6";
import { FaMoneyBillAlt } from "react-icons/fa";

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
    <div className="py-10 w-11/12 m-auto max-w-screen-xl">
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
        <div>
          <span className="block text-xl font-semibold mb-3">{title}</span>
          <div className="text-gray-500 text-sm flex flex-col gap-1">
            <IconText icon=<GoLocation /> text={location} color="blue" />
            <IconText icon=<FaHelmetSafety /> text={jobType} color="red" />
            <IconText
              icon=<FaMoneyBillAlt />
              text={`$${salary}/Hour`}
              color="green"
            />
          </div>
        </div>

        <p className="h-[4rem] overflow-hidden text-sm leading-relaxed">
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
