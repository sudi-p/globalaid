import { useState } from 'react';
import { useDispatch } from 'react-redux';
import getClient from '../../../lib/api';
import { fetchJobsSuccess } from '../JobsSlice';
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
import styles from './styles/CreateJob.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

const CreateJob = (props) => {
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(CreateJobSchema),
    });
    const dispatch = useDispatch();
    const { setShowCreateJobModal } = props;
    const [company, setCompany] = useState('');
    const [jobType, setJobType] = useState('');
    const [location, setLocation] = useState('');
    const [salary, setSalary] = useState('');
    const [jobSite, setJobSite] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isOwner, setIsOwner] = useState(false);

    const createJob = () => {
        getClient()
            .post('/user/createjob/', {
                company,
                location,
                email,
                phone,
                isOwner
            })
            .then(res => {
                dispatch(fetchJobsSuccess(res.data))
                setShowCreateJobModal(false);
            })
            .catch(err => console.log(err))
    }
    return (
        <div className={styles.createJob}>
            <div className={styles.title}>Line Cook</div>
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
                        {...register("company")}
                        onChange={(e) => setCompany(e.target.value)}
                        error={Boolean(errors.company)}
                        helperText={errors.company?.message}
                    />
                    <TextField
                        fullWidth
                        label="Location"
                        {...register("location")}
                        onChange={(e) => setLocation(e.target.value)}
                        error={Boolean(errors.location)}
                        helperText={errors.location?.message}
                    />
                    <FormControl
                        fullWidth
                        error={errors.rentalType}
                        helperText={errors.rentalType?.message}
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
                        <FormHelperText>{errors.rentalType?.message}</FormHelperText>
                    </FormControl>
                    <Stack spacing={4} direction="row">
                    <TextField
                        fullWidth
                        label="Salary"
                        type="text"
                        {...register("email")}
                        className={styles.TextField}
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
                        error={errors.rentalType}
                        helperText={errors.rentalType?.message}
                    >
                        <InputLabel id="demo-simple-select-label">Job Site</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            {...register("jobType")}
                            value={jobSite}
                            onChange={(e) => setJobSite(e.target.value)}
                        >
                            <MenuItem value="Condo">In-Person</MenuItem>
                            <MenuItem value="Apartment">Remote</MenuItem>
                            <MenuItem value="House">Hybrid</MenuItem>
                        </Select>
                        <FormHelperText>{errors.rentalType?.message}</FormHelperText>
                    </FormControl>          
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
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><EmailIcon /></InputAdornment>,
                            }}
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
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><LocalPhoneIcon /></InputAdornment>,
                            }}
                        />
                    </Stack>
                    <div className={styles.inputBox}>
                        Are you hiring for this Job? If you are not hiring or not associated with the hiring process in anyway, Don't Select.<input style={{ 'resize': 'none' }} type="checkbox" className={styles.input} onChange={() => setIsOwner(!isOwner)} value={isOwner} />
                    </div>
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        size="large"
                    >Create Job Posting</Button>
                </Stack>
            </form>
        </div >
    )
}

export default CreateJob;