import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Stack, TextField, Alert, Button
} from '@mui/material';
import { Home as HomeIcon, Engineering as EngineeringIcon } from '@mui/icons-material';
import styles from './styles/PostAd.module.scss';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import getClient from '../../../lib/api';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const PostAdSchema = yup.object().shape({
    title: yup
        .string()
        .required("Please enter the title."),
    description: yup
        .string()
        .required("Please enter the description for the ad."),
});

export default function PostAd(props) {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(PostAdSchema),
    });
    const [adType, setAdType] = useState('rent');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { open, handleClose } = props;
    const postAd = () => {
        getClient()
            .post('/user/createad/', {
                title,
                description,
                adType
            })
            .then(res => {
                console.log(res.data.ad)
                const { _id } = res.data.ad;
                navigate(`/myads/create-ad/${_id}`);
                handleClose();
            })
            .catch(err => console.log(err))
    }
    useEffect(()=> {
        return () => {
            setTitle('');
            setDescription('');
        }
    }, []);
    return (
        <Dialog
            fullScreen
            open={true}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <div className={styles.navBarLogo} />
                    <Typography
                        sx={{ ml: 2, flex: 1, textAlign: "center" }}
                        variant="h6"
                        component="div"
                    >
                        Post Ad
                    </Typography>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div className={styles.postAd}>
                <form onSubmit={(handleSubmit(postAd))}>
                    <Stack spacing={5}>
                        <TextField                            
                            value={title}
                            variant="outlined"
                            size="large"
                            label="Title"
                            {...register("title")}
                            onChange={(e) => setTitle(e.target.value)}
                            error={Boolean(errors.title)}
                            helperText={errors.title?.message}
                        />
                        <Alert severity="info">
                            Please add a title for your ad to help users relate to it more easily.
                        </Alert>
                        <TextField                            
                            value={description}
                            variant="outlined"
                            size="large"
                            label="Description"
                            multiline
                            rows={4}
                            {...register("description")}
                            onChange={(e) => setDescription(e.target.value)}
                            error={Boolean(errors.description)}
                            helperText={errors.description?.message}
                        />
                        <Stack direction="row" spacing={6} justifyContent={"center"}>
                            <div
                                onClick={() => setAdType('rent')}
                                className={`${adType === "rent" && styles.activeAdType} ${styles.adType}`}
                            ><HomeIcon /><span>Rent a Property</span> </div>
                            <div
                                onClick={() => setAdType('job')}
                                className={`${adType === "job" && styles.activeAdType} ${styles.adType}`}
                            ><EngineeringIcon /> <span>Job Vacancy</span> </div>
                        </Stack>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                        >Next</Button>
                    </Stack>
                </form>
            </div>
        </Dialog>
    )
}
