import React, { useContext, lazy, ReactElement } from 'react';
import { parse } from 'cookie';
import Link from 'next/link';
import { Stack } from '@mui/material';
import { Home as HomeIcon, Engineering as EngineeringIcon } from '@mui/icons-material';
import NavbarLayout from '@components/layout/navBarLayout';
import { axiosPrivate } from '../lib/api';
import styles from '@styles/MyAds.module.scss';
import { GetServerSidePropsContext } from 'next';

interface Ad {
    _id: string;
    title: string;
    description: string;
    adType: string;
    isComplete: boolean;
    views: number;
    price: number;
    replies: number;
}

interface MyAdsProps {
    ads: Ad[];
}

export default function MyAds({ ads }: MyAdsProps) {
    // const { data, isLoading, error } = useQuery({
    //     queryKey: ["myads"],
    //     queryFn: async () => {
    //         const res = await useAxiosPrivate().get("/user/getmyads")
    //         return res.data;
    //     }
    // })
    // if (isLoading) return (<div>Loading..</div>)
    // if (error) return <PageNotFound />
    // const { ads } = data;
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
    const { _id: adId, title, description, adType, isComplete, views, price, replies } = ad;
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
            {!isComplete && <Link href={`/myads/createad/${adId}`}><a className="no-underline text-green-500 absolute bottom-5 right-5">Complete Ad</a></Link>}
        </div>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    try {
        // Parse the cookies from the request
        const cookies = parse(context.req.headers.cookie || '');

        // Retrieve the access token from the cookies
        const config = {
            withCredentials: true,
            headers: {
                Authorization: cookies?.user
                    ? `Bearer ${JSON.parse(cookies.user).accessToken}`
                    : undefined,
                    Cookie: context?.req?.headers?.cookie
            },
        };
        // console.log("config",config)
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