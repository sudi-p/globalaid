import React from 'react';
import styles from './styles/Footer.module.scss';
import {
    Stack
} from '@mui/material';
import {
    Facebook as FacebookIcon,
    Twitter as TwitterIcon,
    LinkedIn as LinkedInIcon,
    Instagram as InstagramIcon,
    Copyright as CopyrightIcon
} from '@mui/icons-material/';

export default function Footer() {
    return (
        <Stack spacing={5} alignItems="center" className={styles.footer}>
            <Stack alignItems="center" justifyContent="center" direction="row">
                <div className={styles.logo} />
                <div>
                    <div className={styles.companyName}>GlobalAid</div>
                    <div className={styles.companyMoto}>Simplifying Student Life</div>
                </div>
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="center">
                <FacebookIcon className={styles.footerIcon} fontSize="large" variant="outlined" />
                <TwitterIcon className={styles.footerIcon} fontSize="large" />
                <LinkedInIcon className={styles.footerIcon} fontSize="large" />
                <InstagramIcon className={styles.footerIcon} fontSize="large" />
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                <CopyrightIcon /> {new Date().getFullYear()} - GlobalAid Inc. All Rights Reserved<span className={styles.footerLink}>Terms Of Use</span><span className={styles.footerLink}>Privacy Policy</span>
            </Stack>
        </Stack>
    )
}
