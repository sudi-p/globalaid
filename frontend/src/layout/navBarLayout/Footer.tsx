import React, { ReactNode } from 'react';
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

interface FooterIconProps{
    children: ReactNode
}

interface FooterLinkProps{
    text: string,
}

export default function Footer() {
    return (
        <Stack spacing={5} alignItems="center" className="h-56 p-6 text-white bg-gray-800">
            <Stack alignItems="center" justifyContent="center" direction="row">
                <div style={{ backgroundImage: "url('https://res.cloudinary.com/dtqxwjmwn/image/upload/v1674412883/GlobalAid/GlobalAid_Logo.png')"}} className="mr-2 w-14 h-14 bg-cover bg-no-repeat bg-center" />
                <div>
                    <div className="text-xl font-bold text-green-400 tracking-wide">GlobalAid</div>
                    <div className="text-lg">Simplifying Student Life</div>
                </div>
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="center">
                <FooterIcon><FacebookIcon fontSize="large" /></FooterIcon>
                <FooterIcon><TwitterIcon fontSize="large" /></FooterIcon>
                <FooterIcon><LinkedInIcon fontSize="large" /></FooterIcon>
                <FooterIcon><InstagramIcon fontSize="large" /></FooterIcon>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                <CopyrightIcon /> {new Date().getFullYear()} - GlobalAid Inc. All Rights Reserved <FooterLink text="Terms Of Use"/><FooterLink text="Privacy Policy"/>
            </Stack>
        </Stack>
    )
}
function FooterIcon({ children }: FooterIconProps) {
    return (
        <div className="text-xl rounded cursor-pointer border-2 pt-1 px-1 border-solid border-white hover:text-green-400 hover:border-green-400">
            {children}
        </div>
    )
}
function FooterLink({ text }: FooterLinkProps) {
    return (
        <div className="pl-1 md:pl-4 cursor-pointer border-0 border-l-2 border-solid border-white hover:text-green-400">
            {text}
        </div>
    )
}