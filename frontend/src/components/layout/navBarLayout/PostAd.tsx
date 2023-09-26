import React, { ReactNode, useEffect, useState } from 'react';
import { AxiosResponse, AxiosError } from 'axios';
import { useRouter } from 'next/router';
import {
    TextField, Alert, Button
} from '@mui/material';
import { Home as HomeIcon, Engineering as EngineeringIcon, Close as CloseIcon } from '@mui/icons-material';
import { Dialog, AppBar, Toolbar, IconButton, Typography, Slide } from '@mui/material/';
import { TransitionProps } from '@mui/material/transitions';
import getClient from '@lib/api';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Logo from '@components/common/Logo';

type PostAdProps = {
    handleClose: () => void;
}

type AdTypeButtonProps = {
    icon: ReactNode,
    text: string,
    isActive: boolean,
    handleClick: () => void;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
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

export default function PostAd({ handleClose }: PostAdProps) {
    const [adType, setAdType] = useState('rent');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(PostAdSchema),
    });
    const postAd = () => {
        getClient()
            .post('/user/createad/', {
                title,
                description,
                adType
            })
            .then((res: AxiosResponse) => {
                console.log(res.data.ad)
                const { _id } = res.data.ad;
                router.push(`/myads/create-ad/${_id}`);
                handleClose();
            })
            .catch((err: AxiosError) => console.log(err))
    }
    useEffect(() => {
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
                    <Logo color="white"/>
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
            <div className="mx-auto my-12 lg:w-1/2 p-4">
                <form onSubmit={(handleSubmit(postAd))}>
                    <div className='flex flex-col gap-8'>
                        <TextField
                            value={title}
                            variant="outlined"
                            size="medium"
                            label="Title"
                            {...register("title")}
                            onChange={(e) => setTitle(e.target.value)}
                            error={Boolean(errors.title)}
                            helperText={errors.title?.message?.toString()}
                        />
                        <Alert severity="info">
                            Please add a title for your ad to help users relate to it more easily.
                        </Alert>
                        <TextField
                            value={description}
                            variant="outlined"
                            label="Description"
                            multiline
                            rows={4}
                            {...register("description")}
                            onChange={(e) => setDescription(e.target.value)}
                            error={Boolean(errors.description)}
                            helperText={errors.description?.message?.toString()}
                        />
                        <div className='sm:flex justify-center gap-10'>
                            <AdTypeButton
                                handleClick={() => setAdType('rent')}
                                isActive={adType === "rent"}
                                text="Rent a Property"
                                icon={<HomeIcon />}
                            />
                            <AdTypeButton
                                handleClick={() => setAdType('job')}
                                isActive={adType === "job"}
                                text="Job Vacancy"
                                icon={<EngineeringIcon />}
                            />
                        </div>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                        >Next</Button>
                    </div>
                </form>
            </div>
        </Dialog>
    )
}

function AdTypeButton({ icon, text, isActive, handleClick }: AdTypeButtonProps) {
    return (
        <div
            onClick={handleClick}
            className={`border border-solid border-gray-300 flex items-center p-6 cursor-pointer text-md ${isActive && "border-green-300 text-green-300"}`}
        >
            {icon} <span className="ml-1">{text}</span>
        </div>
    )
}
