import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import { axiosPrivate } from "@lib/api";
import { MdOutlineCloudUpload } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoWarning } from "react-icons/io5";
import useUploadRentalsPhotos from "./hooks/useUploadRentalsPhotos";

type UploadRentalPhotosProps = {
  adId: string;
};

export default function UploadRentalPhotos({ adId }: UploadRentalPhotosProps) {
  const {
    previewUrls,
    loading,
    error,
    skipUpload,
    selectImages,
    unselectImage,
    uploadImages,
  } = useUploadRentalsPhotos(adId);
  return (
    <div className="m-auto pb-16 relative">
      Rental Photos
      <div className="my-5 flex items-center justify-start w-full">
        <div
          className={`p-6 w-full border-2 border-gray-300 border-dashed rounded-lg ${!previewUrls.length && `cursor-pointer`} bg-gray-50 hover:bg-gray-100`}
        >
          {previewUrls.length ? (
            <div className="flex gap-2">
              {previewUrls.map((previewUrl) => (
                <div className="relative" key={previewUrl}>
                  <IoIosCloseCircleOutline
                    onClick={() => unselectImage(previewUrl)}
                    className="absolute top-1 right-1 text-2xl text-gray-500"
                  />
                  <img
                    src={previewUrl}
                    alt="Preview"
                    key={previewUrl}
                    className="h-36 w-36 border border-solid border-gray-300 rounded-lg cursor-pointer"
                  />
                </div>
              ))}
              <label
                htmlFor="dropzone-file"
                className=" flex flex-col items-center justify-center text-center h-36 w-36 border border-solid border-gray-300 rounded-lg cursor-pointer"
              >
                <MdOutlineCloudUpload className="text-3xl text-gray-500" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload more</span> or
                  drag and drop
                </p>
              </label>
            </div>
          ) : (
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center h-full"
            >
              <MdOutlineCloudUpload className="text-3xl text-gray-500" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 2Mb)
              </p>
            </label>
          )}
          <input
            onChange={selectImages}
            id="dropzone-file"
            type="file"
            className="hidden"
            accept="image/png, image/gif, image/jpeg, image/webp"
            multiple
          />
        </div>
      </div>
      {error && (
        <div className="bg-red-400 p-3 my-2 rounded-lg text-white text-center flex items-center justify-center gap-2">
          <IoWarning />
          {error}
        </div>
      )}
      <div className="p-2 flex justify-end gap-3">
        <Button variant="outlined" onClick={skipUpload}>
          Skip
        </Button>
        <Button variant="contained" onClick={uploadImages}>
          {loading ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </div>
  );
}
