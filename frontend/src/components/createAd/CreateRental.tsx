import React, { useState } from 'react';
import {
    Button, MenuItem, Stack, TextField,
    FormControl, FormHelperText, InputLabel, InputAdornment,
    Select, Checkbox, Box, Stepper,
    Step, StepLabel, Divider
} from '@mui/material';
import {
    LocalPhone as LocalPhoneIcon,
    Email as EmailIcon,
    Bed as BedIcon,
    Bathtub as BathtubIcon
} from '@mui/icons-material/';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const PostRentalSchema = yup.object().shape({
    location: yup
        .string()
        .required("Please enter the location"),
    rentalType: yup
        .string()
        .required("Please select the type of rental"),
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
        .matches(phoneRegExp, 'Please enter a valid phone number.')
        .required("Please enter the owner's phone number."),
})
const steps = [
    'Title and Description',
    'Detailed Information',
    'Media',
];

const CreateRental = () => {
    return (
        <Stack spacing={5}>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={1} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            <DetailedInformation />
        </Stack>
    )
}
export default CreateRental;

// const FileUpload = (props) => {
//     const [images, setImages] = useState([]);
//     const [imageURLs, setImageURLs] = useState([]);
//     useEffect(() => {
//         if (images.length < 1) return;
//         const newImageUrls = [];
//         images.forEach(image => newImageUrls.push(URL.createObjectURL(image)));
//         setImageURLs(newImageUrls)
//     }, [images])
//     return (
//         <div>
//             File Upload
//             <input type="file" multiple accept="image/*" onChange={(e) => setImages([...e.target.files])} />
//             {imageURLs.map(imageSrc => <img src={imageSrc} alt="rental images" />)}
//             <Button
//                 variant="outlined"
//                 size="large"
//                 onClick={() => console.log(false)}
//             >Save for Later</Button>
//         </div>
//     )
// }

const DetailedInformation = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(PostRentalSchema),
    });
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
    // useEffect(() => {
    //     navigator.geolocation.getCurrentPosition((position) => {
    //         setLocation({
    //             latitude: position.coords.latitude,
    //             longitude: position.coords.longitude,
    //         });
    //     });
    // }, []);
    // console.log(location)
    return (
        <form onSubmit={(handleSubmit(postRental))}>
            <Stack spacing={5}>
                <TextField
                    fullWidth
                    label="Location"
                    {...register("location")}
                    onChange={(e) => setLocation(e.target.value)}
                    error={Boolean(errors.location)}
                    helperText={errors.location?.message?.toString()}
                />
                <FormControl
                    fullWidth
                    error={Boolean(errors.rentalType)}
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
                    <FormHelperText>{errors.rentalType?.message?.toString()}</FormHelperText>
                </FormControl>
                <Stack spacing={4} direction="row">
                    <TextField
                        fullWidth
                        label="Number of Bedrooms"
                        {...register("bedRoom")}
                        type="number"
                        onChange={(e) => setBedRoom(e.target.value)}
                        value={bedRoom}
                        error={Boolean(errors.bedRoom)}
                        helperText={errors.bedRoom?.message?.toString()}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><BedIcon /></InputAdornment>,
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Number of Washrooms"
                        type="number"
                        {...register("washRoom")}
                        onChange={(e) => setWashRoom(e.target.value)}
                        value={washRoom}
                        error={Boolean(errors.washRoom)}
                        helperText={errors.washRoom?.message?.toString()}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><BathtubIcon /></InputAdornment>,
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
                </Stack>
            </Stack>
        </form>
    )
}