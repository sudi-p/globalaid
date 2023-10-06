import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Paper,
    Stack
} from '@mui/material';

type HeroBoxProps = {
    heading1: string,
    heading2: string,
    link: string,
    linkText: string,
    imageUrl: string
}

export default function Hero() {
    let [showRentalHero, setShowRentalHero] = useState(false)
    useEffect(() => {
        const intervalId = setInterval(() => {
            setShowRentalHero((prevShowRentalHero) => !prevShowRentalHero)
        }, 5000)
        return () => clearTimeout(intervalId)
    }, [])
    return (
        <Paper className="p-4 lg:p-8">
            <div className="max-w-screen-xl m-auto w-full">
                {showRentalHero ? (
                    <HeroBox
                        heading1="Creating a Safe and Welcoming Environment"
                        heading2="Explore Accommodation Options for International Students"
                        link="/rentals/"
                        linkText="View More"
                        imageUrl="https://media.istockphoto.com/id/1312439845/photo/stylish-living-room-interior-with-beautiful-house-plants.jpg?s=612x612&w=0&k=20&c=sUt6jSb1_MZFfymyFmuprGYmtz5XRoGtC2lUsnSr_y4="
                    />) : (
                    <HeroBox
                        heading1="Supporting Your Journey"
                        heading2="Explore Part-Time Job Options for International Students"
                        link="/jobs/"
                        linkText="View More"
                        imageUrl="https://img.freepik.com/premium-photo/barista-hand-pours-beverage-from-coffee-machine_266732-6850.jpg"
                    />
                )}
            </div>
        </Paper>
    )
}

function HeroBox({ heading1, heading2, link, linkText, imageUrl }: HeroBoxProps) {
    return (
        <div  className="flex justify-center align-middle gap-1">
            <div className="text-lg font-semibold flex-1 ">
                <p>{heading1}</p>
                <p>{heading2}</p>
                <Link href={link}><a className="no-underline text-green-400">{linkText}</a></Link>
            </div>
            <div className="h-52 w-1/2 flex-1 overflow-hidden opacity-90 bg-cover bg-no-repeat bg-center rounded-lg"style={{ backgroundImage: `url('${imageUrl}')` }} />
        </div>
    )
}
