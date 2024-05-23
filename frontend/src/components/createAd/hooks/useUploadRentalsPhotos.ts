import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/router';
import { axiosPrivate } from '@src/lib/api';

const useUploadRentalsPhotos = (adId: string) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedImages, setSelectedImages] = useState(new Map());
  const skipUpload = async () => {
    await axiosPrivate.post("/user/skipuploadrentalimages", {
      adId,
    });
    router.push(`/myads/${adId}`);
  };
  const convertBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const uploadImages = async () => {
    try {
      setLoading(true);
      const images = Array.from(selectedImages.values());
      if (images.length) {
        const res = await axiosPrivate.post("/user/uploadrentalimages/", {
          images,
          adId,
        });
        setLoading(false);
        console.log(res)
        if (res.data.msg == "Photos Uploaded"){
          router.push(`/myads/${adId}`);
        }
      } else {
        setError("Please select images");
      }
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const selectImages = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileSize = file.size / 1024 / 1024;
        if (fileSize > 2) {
          setError("File size exceeded");
          return;
        }
        var base = await convertBase64(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          const newUrl = reader.result;
          setSelectedImages((prevSelectedImages) => {
            const updatedSelectedImages = new Map(prevSelectedImages);
            updatedSelectedImages.set(newUrl, base);
            return updatedSelectedImages;
          });
        };
        if (file) {
          reader.readAsDataURL(file);
        } else {
          setSelectedImages(new Map());
        }
      }
    }
  };
  const unselectImage = (url: string) => {
    const updatedSelectedImages = new Map(selectedImages);
    if (updatedSelectedImages.has(url)) {
      updatedSelectedImages.delete(url);
    }
    setSelectedImages(updatedSelectedImages);
  };
  const previewUrls = Array.from(selectedImages.keys());
  return {previewUrls, loading, error, skipUpload, selectImages, unselectImage,  uploadImages}
}

export default useUploadRentalsPhotos