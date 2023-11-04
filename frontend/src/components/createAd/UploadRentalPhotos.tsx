import React from 'react'
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import { axiosPrivate } from '@lib/api';

type UploadRentalPhotosProps = {
  adId: string,
}

export default function UploadRentalPhotos({ adId }: UploadRentalPhotosProps) {
  const router = useRouter();
  const skipUpload = async() => {
    const res = await axiosPrivate.post('/user/skipuploadrentalphotos', {
      adId
    });
    router.push(`/myads/${adId}`)
  }
  return (
    <div className="m-auto pb-16 relative">
      Rental Photos
      <div className="my-5 h-[150px] w-full bg-gray-300"></div>
      <div className="p-2 absolute right-0">
        <Button variant="outlined" onClick={skipUpload}> Skip</Button>
        <Button variant="contained" className="ml-5"> Upload</Button>
      </div>
    </div>
  )
}
