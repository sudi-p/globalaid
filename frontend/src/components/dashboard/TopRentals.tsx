import React from "react";
import Link from "next/link";
import { Paper } from "@mui/material";
import { TopRentalProps } from "@store/slices/DashboardSlice";

type TopRentalsProps = {
  rentals: TopRentalProps[];
};

export default function TopRentals({ rentals }: TopRentalsProps) {
  return (
    <div className="p-5 w-11/12 m-auto max-w-screen-xl">
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
  );
}

function RentalBox({ title, rent, image }: TopRentalProps) {
  return (
    <div className="w-full sm:w-[calc(50%-10px)] xl:w-[calc(25%-15px)] mb-4 sm:mb-0">
      <div className="cursor-pointer rounded-lg hover:shadow-lg border border-solid border-gray-300 transition duration-300 ease-in-out transform hover:scale-105">
        <div
          className="h-60 rounded-t-lg overflow-hidden bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url('${image}')` }}
        />
        <div className="p-4">
          <div className="text-lg font-semibold mb-2">{title}</div>
          <div className="flex justify-between items-center">
            <div className="text-gray-600">${rent}</div>
            <Link
              href={`/rentals/{id}`}
              className="text-green-400 no-underline"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
