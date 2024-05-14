import React, { useState } from "react";
import {
  Button,
  MenuItem,
  Stack,
  TextField,
  FormControl,
  FormHelperText,
  InputLabel,
  InputAdornment,
  Select,
  Divider,
  Checkbox,
} from "@mui/material";
import {
  LocalPhone as LocalPhoneIcon,
  Email as EmailIcon,
  Bed as BedIcon,
  Bathtub as BathtubIcon,
  AttachMoney as AttachMoneyIcon,
} from "@mui/icons-material/";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { axiosPrivate } from "@lib/api";
import { rentalTypes } from "@utils/constants/rentals";
import { useForm as useRentalDetailedInformation } from "@hooks/useForm";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const PostRentalSchema = yup.object().shape({
  location: yup.string().required("Please enter the location"),
  rent: yup.number().required("Please enter the rent"),
  rentalType: yup.string().required("Please select the type of rental"),
  washRoom: yup
    .number()
    .typeError("Please enter a valid number")
    .positive("Please enter a valid number")
    .integer()
    .required("Please enter the number of washrooms."),
  bedRoom: yup
    .number()
    .typeError("Please enter a valid number")
    .positive("Please enter a valid number")
    .integer()
    .required("Please enter the number of bedrooms."),
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Please enter owner's email."),
  phone: yup
    .string()
    .matches(phoneRegExp, "Please enter a valid phone number.")
    .required("Please enter the owner's phone number."),
});

export type DetailedInformationProps = {
  adId: string;
  refetch: () => void;
};

const DetailedInformation = ({ adId, refetch }: DetailedInformationProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PostRentalSchema),
  });
  const {
    formData,
    handleTextChange,
    handleSelectChange,
    handleCheckboxChange,
  } = useRentalDetailedInformation({
    location: "",
    rent: "",
    rentalType: "",
    bedRoom: null,
    washRoom: null,
    email: "",
    phone: "",
    isOwner: false,
  });
  const {
    bedRoom,
    rent,
    washRoom,
    rentalType,
    location,
    isOwner,
    email,
    phone,
  } = formData;
  const postRental = async () => {
    await axiosPrivate.post("/user/createRental", {
      adId,
      rent,
      bedRoom,
      washRoom,
      rentalType,
      location,
      isOwner,
      email,
      phone,
    });
    refetch();
  };
  return (
    <form onSubmit={handleSubmit(postRental)}>
      <Stack spacing={5}>
        <TextField
          fullWidth
          label="Location"
          {...register("location")}
          name="location"
          value={location}
          onChange={handleTextChange}
          error={Boolean(errors.location)}
          helperText={errors.location?.message?.toString()}
        />
        <TextField
          fullWidth
          label="Rent"
          type="number"
          {...register("rent")}
          name="rent"
          value={rent}
          onChange={handleTextChange}
          error={Boolean(errors.rent)}
          helperText={errors.rent?.message?.toString()}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AttachMoneyIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl fullWidth error={Boolean(errors.rentalType)}>
          <InputLabel id="demo-simple-select-label">Rental Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            {...register("rentalType")}
            name="rentalType"
            value={rentalType}
            onChange={handleSelectChange}
          >
            {rentalTypes.map(({ label, value }) => (
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
            label="Number of Bedrooms"
            {...register("bedRoom")}
            type="number"
            name="bedRoom"
            value={bedRoom}
            onChange={handleTextChange}
            error={Boolean(errors.bedRoom)}
            helperText={errors.bedRoom?.message?.toString()}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <BedIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Number of Washrooms"
            type="number"
            {...register("washRoom")}
            name="washRoom"
            value={washRoom}
            onChange={handleTextChange}
            error={Boolean(errors.washRoom)}
            helperText={errors.washRoom?.message?.toString()}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <BathtubIcon />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Divider />
        <Stack spacing={4} direction="row">
          <TextField
            fullWidth
            label="Email"
            type="text"
            {...register("email")}
            name="email"
            value={email}
            onChange={handleTextChange}
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
            value={phone}
            onChange={handleTextChange}
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
        <div>
          Are you the owner of this place?
          <input
            style={{ resize: "none" }}
            type="checkbox"
            className="w-8 mr-2"
            name="isOwner"
            checked={isOwner}
            onChange={handleCheckboxChange}
          />
        </div>
        <Stack spacing={3}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            id="submit"
          >
            Save and Continue
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default DetailedInformation;
