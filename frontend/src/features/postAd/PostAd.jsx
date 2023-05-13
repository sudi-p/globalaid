import React, { useState } from 'react';
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function PostAd(props) {
    const [jobType, setJobType] = useState('rent');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { open, handleClose } = props;
    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <div className={styles.navBarLogo} />
                    <Typography sx={{ ml: 2, flex: 1, textAlign: "center" }} variant="h6" component="div">
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
                <Stack spacing={5}>
                    <TextField
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        variant="outlined"
                        size="large"
                        label="Title"
                    />
                    <Alert severity="info">Please add a title for your ad to help users relate to it more easily.</Alert>
                    <TextField
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        variant="outlined"
                        size="large"
                        label="Description"
                        multiline
                        rows={4}
                    />
                    <Stack direction="row" spacing={6} justifyContent={"center"}>
                        <div onClick={() => setJobType('rent')} className={`${jobType === "rent" && styles.activeAdType} ${styles.adType}`}><HomeIcon /><span>Rent a Property</span> </div>
                        <div onClick={() => setJobType('job')} className={`${jobType === "job" && styles.activeAdType} ${styles.adType}`}><EngineeringIcon /> <span>Job Vacancy</span> </div>
                    </Stack>
                    <Button variant="contained" size="large">Next</Button>
                </Stack>
            </div>
        </Dialog>
    )
}
