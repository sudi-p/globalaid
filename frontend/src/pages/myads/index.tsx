import React, { useContext, lazy, ReactElement } from 'react';
import { parse } from 'cookie';
import Link from 'next/link';
import { Stack } from '@mui/material';
import { Home as HomeIcon, Engineering as EngineeringIcon } from '@mui/icons-material';
import NavbarLayout from '@components/layout/navBarLayout';
import { axiosPrivate } from '../../lib/api';
import styles from '@styles/MyAds.module.scss';
import { GetServerSidePropsContext } from 'next';

interface Ad {
    _id: string;
    title: string;
    description: string;
    adType: string;
    complete: boolean;
    views: number;
    price: number;
    replies: number;
}

interface MyAdsProps {
    ads: Ad[];
}

export default function MyAds({ ads }: MyAdsProps) {
    return (
        <div className="max-w-screen-xl m-auto">
            MyAds
            {ads?.map(ad => (<MyAd key={ad._id} ad={ad} />))}
        </div>
    )
}

MyAds.getLayout = function getLayout(page: ReactElement) {
    return <NavbarLayout>{page}</NavbarLayout>
}

function MyAd({ ad }: { ad: Ad }) {
    const { _id: adId, title, description, adType, complete, views, price, replies } = ad;
    return (
        <div className="relative p-5 border border-solid border-gray-300 mb-5">
            <Stack direction={"row"} alignItems="center" spacing={1}>
                <span className="text-4xl">
                    {adType === "rent" ? <HomeIcon fontSize="inherit" /> : <EngineeringIcon fontSize="inherit" />}
                </span>
                <div>
                    <div className={styles.adTitle}>
                        {title}
                    </div>
                    <div className={styles.adDescription}>
                        {description}
                    </div>
                    <div className={styles.adTitle}>
                        Views
                    </div>
                    <div className={styles.adDescription}>
                        Replies
                    </div>
                </div>
            </Stack>
            <Link href={complete ? `/myads/${adId}` : `/myads/createad/${adId}`}>
                <a className="no-underline text-green-500 absolute bottom-5 right-5">
                    {complete ? "View More " : "Complete Ad"}
                </a>
            </Link>
        </div>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    try {
        console.log("getServerSideProps from myads")
        const config = {
            withCredentials: true,
            headers: {
                Cookie: context?.req?.headers?.cookie
            }
        };
        const res = await axiosPrivate.get('/user/getmyads', config);
        return {
            props: {
                ads: res?.data.ads
            }
        }
    } catch (e) {
        return {
            notFound: true,
        }
    }
}
