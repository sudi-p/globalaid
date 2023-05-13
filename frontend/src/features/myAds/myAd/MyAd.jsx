import React from 'react';
import { useParams } from 'react-router-dom';

export default function MyAd() {
    const params = useParams();
    console.log(params.id)
    return (
        <div>
            Hello this is ad
        </div>
    )
}
