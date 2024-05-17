import React, { ReactNode } from "react";
import Link from "next/link";
import Logo from "@components/common/Logo";
import color from "@utils/constants/base";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className={`bg-[#41b3A3] flex h-full`}>
        <div className="flex-1 h-screen text-white px-8 py-5">
          <div className="width-max">
            <Link href="/" className="text-white no-underline">
              <Logo color="white" />
              <div className="font-bold text-5xl mb-5 w-full">GlobalAid</div>
              <div className="w-full text-lg">Simplifying Student Life</div>
            </Link>
          </div>
          <div
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/dtqxwjmwn/image/upload/v1679203677/GlobalAid/website%20images/signup.png')",
            }}
            className="bg-cover bg-no-repeat bg-center h-[581px] w-[537px] relative left-[150px]"
          />
        </div>
        <div className="flex-[2] bg-white pt-[100px] pl-[200px] rounded-3xl rounded-r-none">
          <div className="w-[450px] h-max">{children}</div>
        </div>
      </div>
    </>
  );
}
