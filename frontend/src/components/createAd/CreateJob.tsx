import { useState } from "react";
import { useRouter } from "next/router";
import { axiosPrivate } from "../../lib/api";
import {
  Button,
  Stack,
  TextField,
  Box,
  Stepper,
  Step,
  StepLabel,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material/";
import {
  LocalPhone as LocalPhoneIcon,
  Email as EmailIcon,
  AttachMoney as AttachMoneyIcon,
} from "@mui/icons-material/";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { commitments, jobSites } from "@utils/constants/jobs";
import { useForm as useCreateJob } from "@hooks/useForm";

const steps = ["Title and Description", "Detailed Information"];
const CreateJobSchema = yup.object().shape({
  location: yup.string().required("Please enter the location"),
  company: yup.string().required("Please enter the company name"),
});

type CreateJobProps = {
  adId: string;
};

const CreateJob = ({ adId }: CreateJobProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateJobSchema),
  });
  const router = useRouter();
  const {
    formData,
    handleTextChange,
    handleSelectChange,
    handleCheckboxChange,
  } = useCreateJob({
    company: "",
    location: "",
    jobType: "",
    salary: "",
    jobSite: "",
    email: "",
    phone: "",
    isOwner: false,
  });
  const { company, location, jobType, salary, jobSite, email, phone, isOwner } =
    formData;
  const createJob = async () => {
    await axiosPrivate.post("/user/createjob/", {
      adId: adId,
      company,
      location,
      jobType,
      salary,
      jobSite,
      email,
      phone,
      isOwner,
    });
    router.push(`/myads/${adId}`);
  };
  return (
    <form
      onSubmit={handleSubmit(createJob)}
      className="flex flex-col gap-12 my-10"
    >
      <Box sx={{ width: "100%" }}>
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
        name="company"
        onChange={handleTextChange}
        error={Boolean(errors.company)}
        helperText={errors.company?.message?.toString()}
      />
      <TextField
        fullWidth
        label="Location"
        value={location}
        {...register("location")}
        name="location"
        onChange={handleTextChange}
        error={Boolean(errors.location)}
        helperText={errors.location?.message?.toString()}
      />
      <FormControl fullWidth error={Boolean(errors.rentalType)}>
        <InputLabel id="demo-simple-select-label">Job Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          {...register("jobType")}
          value={jobType}
          name="jobType"
          onChange={handleSelectChange}
        >
          {commitments.map(({ label, value }) => (
            <MenuItem value={value}>{label}</MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {errors.rentalType?.message?.toString()}
        </FormHelperText>
      </FormControl>
      <Stack spacing={4} direction="row">
        <TextField
          fullWidth
          label="Salary"
          type="text"
          {...register("salary")}
          name="salary"
          onChange={handleTextChange}
          value={salary}
          error={Boolean(errors.email)}
          helperText={`*Salary Per Hour ${
            errors.email ? errors.email.message : ""
          }`}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AttachMoneyIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl fullWidth error={Boolean(errors.rentalType)}>
          <InputLabel id="demo-simple-select-label">Job Site</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            {...register("jobSite")}
            value={jobSite}
            name="jobSite"
            onChange={handleSelectChange}
          >
            {jobSites.map(({ value, label }) => (
              <MenuItem value={value}>{label}</MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {errors.rentalType?.message?.toString()}
          </FormHelperText>
        </FormControl>
      </Stack>

      <Stack spacing={4} direction="row">
        <TextField
          fullWidth
          label="Email"
          type="text"
          {...register("email")}
          name="email"
          onChange={handleTextChange}
          value={email}
          error={Boolean(errors.email)}
          helperText={errors.email?.message?.toString()}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Mobile Number"
          type="text"
          {...register("phone")}
          name="phone"
          onChange={handleTextChange}
          value={phone}
          error={Boolean(errors.phone)}
          helperText={errors.phone?.message?.toString()}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <LocalPhoneIcon />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <div className="mb-4 flex leading-normal">
        Are you hiring for this Job? If you are not hiring or not associated
        with the hiring process in anyway, Don't Select.
        <input
          style={{ resize: "none" }}
          type="checkbox"
          className="w-8 mr-2"
          name="isOwner"
          onChange={handleCheckboxChange}
          checked={isOwner}
        />
      </div>
      <Button color="primary" variant="contained" type="submit" size="large">
        Publish Job Posting
      </Button>
    </form>
  );
};

export default CreateJob;
