import React from 'react';
import { useParams } from 'react-router-dom';

export default function MyAds() {
    const { id } = useParams();
    console.log(id)
    return (
        <div>
            These are my ads.
        </div>
    )
}
