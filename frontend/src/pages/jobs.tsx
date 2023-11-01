import React, { ReactElement, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Email, LocalPhone, LocationOnOutlined } from '@mui/icons-material/';
import { Chip, Stack, Paper } from '@mui/material';
import axios, { axiosPrivate } from '@lib/api';
import NavbarLayout from '@components/layout/navBarLayout/';
import Filter from '../components/jobs/Filter';
import SearchBar from '../components/jobs/SearchBar';
import PageNotFound from './404';

// function Jobs({ ads }) {
function Jobs() {
  const jobsQuery = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const res = await axiosPrivate.get('/user/getjobs/')
      return res.data;
    }
  });
  const { isLoading, error, data } = jobsQuery;
  if (isLoading) return <h1>Loading...</h1>
  if (error) return <PageNotFound />
  const { ads } = data;
  return (
    <div className="my-5 mx-auto max-w-screen-xl">
      <Stack direction="row" spacing={"20px"}>
        <Filter />
        <JobsList jobs={ads} />
      </Stack>
    </div>
  );
}

type JobsListProps = {
  jobs: JobProps[];
}

const JobsList = ({ jobs }: JobsListProps) => {
  return (
    <Stack spacing={"20px"} className="flex-1">
      <SearchBar />
      <Paper elevation={0} variant="outlined" className="flex-1 p-5">
        <Stack direction="row" flexWrap={"wrap"} gap="15px">
          {jobs && jobs.map(job => (<JobBox key={job._id} {...job} />))}
          {jobs && jobs.map(job => (<JobBox key={job._id} {...job} />))}
          {jobs && jobs.map(job => (<JobBox key={job._id} {...job} />))}
          {jobs && jobs.map(job => (<JobBox key={job._id} {...job} />))}
        </Stack>
      </Paper>
    </Stack>
  );
}
type JobProps = {
  _id: string;
  description: string;
  title: string;
  company: string;
  location: string;
  email: string;
  phone: string
}

const JobBox = ({ _id, description, title, company, location, email, phone }: JobProps) => {
  return (
    <div key={_id} className={`w-76 p-5 rounded-lg bg-gray-100 text-gray-600`}>
      <div className="flex items-end mb-3.5">
        <div className="text-xl font-bold">{title}</div> |
        <div className="hover:text-green-400">{company}</div>
      </div>
      {location && (
        <Chip
          color="primary"
          size="small"
          variant="outlined"
          label={location}
          icon={<LocationOnOutlined />}
        />
      )}
      <div className="my-2.5 truncate">{description}</div>
      <Stack direction="row" spacing={1}>
        {email && (
          <Chip
            color="primary"
            size="small"
            variant="outlined"
            label={email}
            icon={<Email fontSize="small" />}
          />
        )}
        {phone && (
          <Chip
            color="primary"
            size="small"
            variant="outlined"
            label={phone}
            icon={<LocalPhone />}
          />
        )}
      </Stack>
    </div>
  )
}

export default Jobs;

// export const getServerSideProps = async () => {
//   try {
//     const res = await axiosPrivate.get('/user/getjobs')
//     return {
//       props: {
//         ads: res?.data?.ads,
//       }
//     }
//   } catch (e) {
//     return {
//       notFound: true,
//     };
//   }
// }

Jobs.getLayout = function getLayout(page: ReactElement) {
  return <NavbarLayout>{page}</NavbarLayout>
}