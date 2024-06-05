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
      <div className="text-2xl mb-5 flex justify-between">
        <div>Top Rentals</div>
        <Link className="text-green-400 text-lg no-underline" href="/rentals/">
          View More
        </Link>
      </div>
      <div className="flex flex-wrap justify-center m-auto box-border sm:gap-5">
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
      <Paper className="cursor-pointer brightness-95 hover:brightness-100">
        <div
          className="h-60 rounded-t-lg overflow-hidden bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url('${image}')` }}
        />
        <div className="p-4 flex justify-between">
          <div className="w-[230px] leading-tight">{title}</div>
          <div className="font-semibold text-green-400">${rent}</div>
        </div>
      </Paper>
    </div>
  );
}
