import { useState } from 'react';
import { useRouter } from 'next/router';
import { axiosPrivate } from '../../lib/api';
import {
  Button, Stack, TextField, Box,
  Stepper, Step, StepLabel, InputAdornment,
  FormControl, InputLabel, Select, MenuItem,
  FormHelperText
} from '@mui/material/';
import {
  LocalPhone as LocalPhoneIcon,
  Email as EmailIcon,
  AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material/';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AxiosError, AxiosResponse } from 'axios';

const steps = [
  'Title and Description',
  'Detailed Information',
];
const CreateJobSchema = yup.object().shape({
  location: yup
    .string()
    .required("Please enter the location"),
  company: yup
    .string()
    .required("Please enter the company name"),
});

type CreateJobProps = {
  adId: string
}

const CreateJob = ({ adId }: CreateJobProps) => {
  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(CreateJobSchema),
  });
  const router = useRouter();
  const [company, setCompany] = useState('');
  const [jobType, setJobType] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [jobSite, setJobSite] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isOwner, setIsOwner] = useState(false);

  const createJob = async () => {
    const res = await axiosPrivate.post('/user/createjob/', {
      adId: adId,
      company,
      location,
      jobType,
      salary,
      jobSite,
      email,
      phone,
      isOwner
    })
    const jobId = res.data.jobId;
    router.push(`/myads/${jobId}`)
  }
  return (
    <form onSubmit={(handleSubmit(createJob))}>
      <Stack spacing={4}>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={1} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <TextField
          fullWidth
          label="Company"
          value={company}
          {...register("company")}
          onChange={(e) => setCompany(e.target.value)}
          error={Boolean(errors.company)}
          helperText={errors.company?.message?.toString()}
        />
        <TextField
          fullWidth
          label="Location"
          value={location}
          {...register("location")}
          onChange={(e) => setLocation(e.target.value)}
          error={Boolean(errors.location)}
          helperText={errors.location?.message?.toString()}
        />
        <FormControl
          fullWidth
          error={Boolean(errors.rentalType)}
        >
          <InputLabel id="demo-simple-select-label">Job Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            {...register("jobType")}
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <MenuItem value="Full-Time">Full-Time</MenuItem>
            <MenuItem value="Part-Time">Part-time</MenuItem>
            <MenuItem value="Permanent">Permanent</MenuItem>
            <MenuItem value="Temporary">Temporary</MenuItem>
            <MenuItem value="Casual">Casual</MenuItem>
          </Select>
          <FormHelperText>{errors.rentalType?.message?.toString()}</FormHelperText>
        </FormControl>
        <Stack spacing={4} direction="row">
          <TextField
            fullWidth
            label="Salary"
            type="text"
            {...register("salary")}
            onChange={(e) => setSalary(e.target.value)}
            value={salary}
            error={Boolean(errors.email)}
            helperText={`*Salary Per Hour ${errors.email ? errors.email.message : ""}`}
            InputProps={{
              endAdornment: <InputAdornment position="end"><AttachMoneyIcon /></InputAdornment>,
            }}
          />
          <FormControl
            fullWidth
            error={Boolean(errors.rentalType)}
          >
            <InputLabel id="demo-simple-select-label">Job Site</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              {...register("jobType")}
              value={jobSite}
              onChange={(e) => setJobSite(e.target.value)}
            >
              <MenuItem value="In-Person">In-Person</MenuItem>
              <MenuItem value="Remote">Remote</MenuItem>
              <MenuItem value="Hybrid">Hybrid</MenuItem>
            </Select>
            <FormHelperText>{errors.rentalType?.message?.toString()}</FormHelperText>
          </FormControl>
        </Stack>

        <Stack spacing={4} direction="row">
          <TextField
            fullWidth
            label="Email"
            type="text"
            {...register("email")}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            error={Boolean(errors.email)}
            helperText={errors.email?.message?.toString()}
            InputProps={{
              endAdornment: <InputAdornment position="end"><EmailIcon /></InputAdornment>,
            }}
          />
          <TextField
            fullWidth
            label="Mobile Number"
            type="text"
            {...register("phone")}
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            error={Boolean(errors.phone)}
            helperText={errors.phone?.message?.toString()}
            InputProps={{
              endAdornment: <InputAdornment position="end"><LocalPhoneIcon /></InputAdornment>,
            }}
          />
        </Stack>
        <div className="mb-4 flex leading-normal">
          Are you hiring for this Job? If you are not hiring or not associated with the hiring process in anyway, Don't Select.<input style={{ 'resize': 'none' }} type="checkbox" className="w-8" onChange={() => setIsOwner(!isOwner)} checked={isOwner} />
        </div>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          size="large"
        >Publish Job Posting</Button>
      </Stack>
    </form>
  )
}

export default CreateJob;