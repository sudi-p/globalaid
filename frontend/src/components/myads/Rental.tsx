import React from "react";
type RentalProps = {
  washRoom: number;
  rentalType: string;
  location: string;
  rent: string;
  isOwner: boolean;
  images: Array<string>;
  bedRoom: number;
};
type RentalAdProps = { ad: RentalProps };

const Rental = ({
  ad: { washRoom, rentalType, rent, location, isOwner, images, bedRoom },
}: RentalAdProps) => {
  return (
    <div>
      <div>{washRoom} Washrooms </div>
      <div className="mb-1">{rentalType}</div>
      <div className="mb-1">Rent: {rent}</div>
      <div className="mb-1">{location}</div>
      <div className="flex gap-2">
        {images.map((image) => (
          <img src={image} className="h-32 w-32 rounded-lg" />
        ))}
      </div>
    </div>
  );
};

export default Rental;
