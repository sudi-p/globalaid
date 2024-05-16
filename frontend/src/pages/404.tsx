import React, { memo } from "react";
import Link from "next/link";

const PageNotFound = () => {
  return (
    <div className="px-5 py-16 max-w-screen-xl m-auto md:text-2xl md:p-20 md:text-gray-500 md:flex md:justify-center">
      <div className=" text-center md:w-auto md:text-left pr-5">
        <span className="text-5xl font-bold mb-12">Page Not Available</span>

        <p className="mb-5">Sorry, this page isn't available</p>

        <p className="mb-5">
          The link you followed may be broken , or the page may have been
          removed or you may be logged out from our system.
        </p>
        <p>
          Go back to{" "}
          <Link href="/" className="font-bold no-underline">
            Home
          </Link>{" "}
          page.
        </p>
      </div>
      <div
        style={{
          backgroundImage:
            "url('http://res.cloudinary.com/dtqxwjmwn/image/upload/v1533053037/Untitled.png')",
        }}
        className="bg-contain bg-no-repeat m-auto h-52 w-72 md:h-60 md:w-[500px]"
      />
    </div>
  );
};

export default memo(PageNotFound);
