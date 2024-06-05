import React from "react";
import Link from "next/link";
import { CiImageOn } from "react-icons/ci";

export type TopRentalProps = {
  id: string;
  title: string;
  rent: number;
  image: string;
};

type TopRentalsProps = {
  rentals: TopRentalProps[];
};

export default function TopRentals({ rentals }: TopRentalsProps) {
  return (
    <div className="border-0 border-t border-b border-solid border-gray-200 py-10">
      <div className="w-11/12 m-auto max-w-screen-xl">
        <div className="text-2xl mb-5 flex justify-between items-center">
          <div>Top Rentals</div>
          <Link
            href="/rentals/"
            className="text-green-400 text-lg no-underline hover:font-semibold"
          >
            View More
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-5">
          {rentals.map((rental) => (
            <RentalBox key={rental.id} {...rental} />
          ))}
        </div>
      </div>
    </div>
  );
}

function RentalBox({ title, rent, image }: TopRentalProps) {
  return (
    <div className="cursor-pointer rounded-lg hover:shadow-lg border border-solid border-gray-300 transition duration-300 ease-in-out transform hover:scale-105 w-full shadow-md sm:w-[calc(50%-10px)] xl:w-[calc(25%-15px)] mb-4 sm:mb-0">
      <div
        className="h-60 rounded-t-lg overflow-hidden bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url('${image}')` }}
      >
        {!image && (
          <div className="h-full flex flex-col justify-center items-center text-xl text-gray-400 border-0 border-b border-solid border-gray-300">
            <CiImageOn className="text-6xl" />
            <div className="text-2xl">Image</div> Coming Soon
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="text-lg font-semibold mb-2 h-6 overflow-hidden">
          {title}
        </div>
        <div className="flex justify-between items-center">
          <div className="text-gray-600">${rent}</div>
          <Link href={`/rentals/{id}`} className="text-green-400 no-underline">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
