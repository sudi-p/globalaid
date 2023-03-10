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
    Box,
    Checkbox
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from './styles/PostRental.module.scss';
import Modal from '../../components/modal/Modal.jsx';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const PostRentalSchema = yup.object().shape({
    title: yup
        .string()
        .required("Please enter the title."),
    description: yup
        .string()
        .required("Please enter the description."),
    location: yup
        .string()
        .required("Please enter the location"),
    rentalType: yup
        .string()
        .required("Please select the type of rental"),
    washRoom:  yup
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

const PostRental = (props) => {
    const { register, handleSubmit, formState: { errors },} = useForm({
        resolver: yupResolver(PostRentalSchema),
    });
    const [ showConfirmCancel, setShowConfirmCancel ] = useState(false);
    const { setShowPostRentalModal } = props;
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ bedRoom, setBedRoom ] = useState('');
    const [ washRoom, setWashRoom ] = useState('');
    const [ rentalType, setRentalType ] = useState('');
    const [ location, setLocation ] = useState('');
    const [ isOwner, setIsOwner ] = useState(false);
    const [ email, setEmail ] = useState('')
    const [ phone, setPhone ] = useState('')
    const postRental = (e) => {
        e.preventDefault()
        console.log("Hello")
    }
    const confirmCancel = () => {
        setTitle('')
        setDescription('')
        setLocation('')
        setShowConfirmCancel(false)
        setShowPostRentalModal(false)
    }
    return(
        <Modal>
           <div className={styles.postRental}>
                <div className={styles.title}>Post Rental</div>
                <form onSubmit={(handleSubmit(postRental))}>
                    <div className={styles.inputBox}>
                        <TextField
                            label="Title"
                            {...register("title")}
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            error={Boolean(errors.title)}
                            helperText={errors.title?.message}
                        />
                    </div>
                    <div className={styles.inputBox}>
                        <TextField
                            multiline
                            rows={4}
                            {...register("description")}
                            label="Description"
                            onChange={(e) => {
                                console.log(e.target.value)
                                setDescription(e.target.value)
                            }}
                            value={description}                            
                            error={Boolean(errors.description)}
                            helperText={errors.description?.message}
                        />
                    </div>
                    <div className={styles.inputBox}>
                        <TextField
                            label="Location"
                            {...register("location")}
                            onChange={(e) => setLocation(e.target.value)}
                            value={location}
                            error={Boolean(errors.location)}
                            helperText={errors.location?.message}
                        />
                    </div>
                    <div className={styles.inputBox}>
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
                    </div>
                    <Stack spacing={2} direction="row">
                        <div className={styles.inputBox}>
                            <TextField 
                                label="Number of Bedrooms"
                                {...register("bedRoom")}
                                type="number"
                                className={styles.TextField}
                                onChange={(e) => setBedRoom(e.target.value)}
                                value={bedRoom}
                                error={errors.bedRoom}
                                helperText={errors.bedRoom?.message}
                            />
                        </div>
                        <div className={styles.inputBox}>
                            <TextField
                                label="Number of Washrooms"
                                type="number"
                                {...register("washRoom")}
                                className={styles.TextField}
                                onChange={(e) => setWashRoom(e.target.value)}
                                value={washRoom}
                                error={errors.washRoom}
                                helperText={errors.washRoom?.message}
                            />
                        </div>
                    </Stack>
                    <Stack spacing={2} direction="row">
                        <div className={styles.inputBox}>
                            <TextField
                                label="Email"
                                type="text"
                                {...register("email")}
                                className={styles.TextField}
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                error={errors.email}
                                helperText={errors.email?.message}
                            />
                        </div>
                        <div className={styles.inputBox}>
                            <TextField
                                label="Mobile Number"
                                type="text"
                                {...register("phone")}
                                className={styles.TextField}
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                                error={errors.phone}
                                helperText={errors.phone?.message}
                            />
                        </div>
                    </Stack>
                    <div className={styles.inputBox}>
                        Are you the owner of this place?
                        <Checkbox onChange={() => setIsOwner(!isOwner)} value={isOwner}/>
                    </div>
                    <div className={styles.actions}>
                        { showConfirmCancel && (
                            <div className={styles.confirmCancel}>
                                Are you sure you want to cancel? All information will be lost.
                                <Stack spacing={2} direction="row">
                                    <Button
                                        onClick={() => confirmCancel()}
                                        variant="contained"
                                > Cancel</Button>
                                    <Button
                                        onClick={() => setShowConfirmCancel(false)}
                                        variant="outlined"
                                    >Go Back</Button>
                                </Stack>
                            </div>
                        )}
                        <Stack spacing={2} direction="row">
                            <Button
                                variant="outlined"
                                onClick={() => setShowConfirmCancel(true)}
                            >Cancel</Button>
                            <Button
                                variant="contained"
                                type="submit"
                                id="submit"
                            >Post Rental</Button>
                        </Stack>
                    </div>
                </form>
            </div>
        </Modal>
    )
}
export default PostRental;
