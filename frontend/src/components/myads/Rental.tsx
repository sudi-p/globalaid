import React, { useEffect, useState } from "react";
import IconText from "../ui/IconText";
import { MdBathtub, MdLocationOn } from "react-icons/md";
import {
  FaBed,
  FaBuilding,
  FaEnvelope,
  FaMoneyBillWave,
  FaPhone,
} from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
type RentalProps = {
  washRoom: number;
  rentalType: string;
  location: string;
  rent: string;
  isOwner: boolean;
  images: Array<string>;
  bedRoom: number;
  email: string;
  phone: string;
};
type RentalAdProps = { ad: RentalProps };

const Rental = ({
  ad: {
    washRoom,
    rentalType,
    rent,
    location,
    isOwner,
    images,
    bedRoom,
    email,
    phone,
  },
}: RentalAdProps) => {
  const [ad, setAd] = useState({
    washRoom,
    rentalType,
    rent,
    location,
    isOwner,
    bedRoom,
    email,
    phone,
  });
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    setAd({
      washRoom,
      rentalType,
      rent,
      location,
      isOwner,
      bedRoom,
      email,
      phone,
    });
  }, [ad]);
  console.log(ad);
  return (
    <div className="flex gap-10">
      <div className="flex-1 flex flex-col gap-4 rounded border border-solid border-gray-300 p-4">
        <div className="text-xl border-0 border-b border-solid border-gray-300 pb-2 mb-2 flex justify-between">
          Contact and Basic Information
          <div onClick={() => setEdit(true)} className="text-green-300">
            Edit
          </div>
        </div>
        <IconText text={phone} icon=<FaPhone /> color="green" />
        <IconText text={email} icon=<FaEnvelope /> color="blue" />
        <IconText text={`${bedRoom} beds`} icon=<FaBed /> color="maroon" />
        <IconText
          text={`${washRoom} baths`}
          icon=<MdBathtub />
          color="maroon"
        />
        <IconText text={rentalType} icon=<FaBuilding /> color="maroon" />
        <IconText
          text={`${rent} per month`}
          icon=<FaMoneyBillWave />
          color="green"
        />
        <IconText text={location} icon=<MdLocationOn /> />
        <IconText
          text={isOwner ? "Owner" : "Not Owner"}
          icon=<IoPersonSharp />
        />
      </div>
      <div className="flex-1 rounded border border-solid border-gray-300 p-4">
        <div className="text-xl border-0 border-b border-solid border-gray-300 pb-2 mb-4 flex justify-between">
          Gallery
          <div className="text-green-300">Edit</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Rental Image ${index + 1}`}
              className="h-32 w-32 object-cover rounded-lg shadow-sm transition-transform duration-300 hover:scale-105"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rental;
