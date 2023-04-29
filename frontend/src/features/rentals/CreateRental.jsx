import React, { useState } from 'react';
import {
    Button,
    MenuItem,
    Stack,
    TextField,
    FormControl,
    FormHelperText,
    InputLabel,
    Select,
    Checkbox,
    Box,
    Stepper,
    Step,
    StepLabel
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from './styles/CreateRental.module.scss';
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const PostRentalSchema = yup.object().shape({
    location: yup
        .string()
        .required("Please enter the location"),
    rentalType: yup
        .string()
        .required("Please select the type of rental"),
    washRoom: yup
        .number("Please enter a valid number")
        .typeError("Please enter a valid number")
        .positive("Please enter a valid number")
        .integer()
        .required("Please enter the number of washrooms."),
    bedRoom: yup
        .number("Please enter a valid number")
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
        .matches(phoneRegExp, 'Please enter a valid phone number.')
        .required("Please enter the owner's phone number."),
})
const steps = [
    'Title and Description',
    'Detailed Information',
    'Media',
];

const PostRental = (props) => {
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(PostRentalSchema),
    });
    const { setShowPostRentalModal } = props;
    const [bedRoom, setBedRoom] = useState('');
    const [washRoom, setWashRoom] = useState('');
    const [rentalType, setRentalType] = useState('');
    const [location, setLocation] = useState('');
    const [isOwner, setIsOwner] = useState(false);
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const postRental = (e) => {
        e.preventDefault()
        console.log("Hello")
    }
    return (
        <div className={styles.postRental}>
            <form onSubmit={(handleSubmit(postRental))}>
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
                        label="Location"
                        {...register("location")}
                        onChange={(e) => setLocation(e.target.value)}
                        value={location}
                        error={Boolean(errors.location)}
                        helperText={errors.location?.message}
                    />
                    <FormControl
                        fullWidth
                        error={errors.rentalType}
                        helperText={errors.rentalType?.message}
                    >
                        <InputLabel id="demo-simple-select-label">Rental Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            {...register("rentalType")}
                            value={rentalType}
                            onChange={(e) => setRentalType(e.target.value)}
                        >
                            <MenuItem value="Condo">Condo</MenuItem>
                            <MenuItem value="Apartment">Apartment</MenuItem>
                            <MenuItem value="House">House</MenuItem>
                            <MenuItem value="Town House">Town House</MenuItem>
                            <MenuItem value="Basement">Basement</MenuItem>
                        </Select>
                        <FormHelperText>{errors.rentalType?.message}</FormHelperText>
                    </FormControl>
                    <Stack spacing={4} direction="row">
                        <TextField
                            fullWidth
                            label="Number of Bedrooms"
                            {...register("bedRoom")}
                            type="number"
                            className={styles.TextField}
                            onChange={(e) => setBedRoom(e.target.value)}
                            value={bedRoom}
                            error={errors.bedRoom}
                            helperText={errors.bedRoom?.message}
                        />
                        <TextField
                            fullWidth
                            label="Number of Washrooms"
                            type="number"
                            {...register("washRoom")}
                            className={styles.TextField}
                            onChange={(e) => setWashRoom(e.target.value)}
                            value={washRoom}
                            error={errors.washRoom}
                            helperText={errors.washRoom?.message}
                        />
                    </Stack>
                    <Stack spacing={4} direction="row">
                        <TextField
                            fullWidth
                            label="Email"
                            type="text"
                            {...register("email")}
                            className={styles.TextField}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            error={errors.email}
                            helperText={errors.email?.message}
                        />
                        <TextField
                            fullWidth
                            label="Mobile Number"
                            type="text"
                            {...register("phone")}
                            className={styles.TextField}
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            error={errors.phone}
                            helperText={errors.phone?.message}
                        />
                    </Stack>
                    <div>
                        Are you the owner of this place?
                        <Checkbox onChange={() => setIsOwner(!isOwner)} value={isOwner} />
                    </div>
                    <Stack spacing={3} >
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            size="large"
                            id="submit"
                        >Save and Continue</Button>
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => setShowPostRentalModal(false)}
                        >Save for Later</Button>

                    </Stack>
                </Stack>
            </form>
        </div>
    )
}
export default PostRental;
