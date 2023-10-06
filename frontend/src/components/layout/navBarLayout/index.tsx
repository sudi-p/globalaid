import React, { ReactNode, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useDispatch } from "react-redux";
import {
  fetchUserStart,
  fetchUserSuccess,
  clearLoggedInUser,
} from "@store/slices/LoggedInUserSlice";
import { Button, Stack, Divider } from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  ChatBubbleOutline
} from "@mui/icons-material";
import PostAd from './PostAd';
import Footer from './Footer';
import Logo from "@components/common/Logo";
import { AxiosError, AxiosResponse } from "axios";
import useAxiosPrivate from "@hooks/useAxiosPrivate";
import AuthContext from "@context/AuthProvider";
import { clearAuthFromStorage, getUserFromStorage } from "@utils/cookie-utils";

type NavbarLayoutProps = {
  children: ReactNode
}

export default function NavbarLayout({ children }: NavbarLayoutProps) {
  return (
    <div className="flex flex-col overflow-hidden">
      <NavBar />
      <div className="flex-1 bg-gray-100">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export function NavBar() {
  const axiosPrivate = useAxiosPrivate();
  const [email, setEmail] = useState("")
  const { setAuth } = useContext(AuthContext)??{};
  const router = useRouter();
  useEffect(()=> {
    let user = getUserFromStorage();
    if (user){
      setEmail(user.email)
    }
  }, []);
  const [expandMenu, setExpandMenu] = useState(false);
  const [openPostAdModal, setOpenPostAdModal] = useState(false);
  const handlePostAdButton = () => {
    setOpenPostAdModal((prevOpenPostAdModal) => !prevOpenPostAdModal);
  };
  const logout = async () => {
    setAuth({accessToken:"", user:{email: ""}});
    setEmail("")
    clearAuthFromStorage();
    await axiosPrivate.post("/auth/logout/")
    router.push("/");
  };
  const navLinks = [
    {
      name: "Home",
      link: "/"
    },
    {
      name: "Jobs",
      link: "/jobs"
    },
    {
      name: "Rentals",
      link: "/rentals"
    },
  ];
  const extraNavLinks = [
    {
      name: "My Account",
      link: "/myads"
    },
    {
      name: "My Ads",
      link: "/myads"
    }
  ]
  const authLinks = [
    {
      name: "Login",
      link: "/login"
    },
    {
      name: "Sign Up",
      link: "/signup"
    }
  ]
  email ? navLinks.push(...extraNavLinks) : navLinks.push(...authLinks)
  return (
    <>
      <div className={`px-2 md:px-10 lg:px-4 h-16 relative flex justify-between items-center font-semibold max-w-screen-xl md:m-auto md:w-11/12`}>
        <Logo color="black" />
        <div className={`${expandMenu ? 'top-16 ' : 'top-[-490px]'} absolute block -left-1 -right-6 z-10 border border-solid border-gray-300 md:border-0 bg-white md:bg-transparent md:static md:flex items-center transition-all duration-500 ease-in`}>
          {navLinks.map(({ name, link }) => (
            <Link
              href={link}
              key={name}
            >
              <a className="no-underline">
                <NavText
                  isActive={router.route === link}
                  title={name}
                />
              </a>
            </Link>
          ))}
          <div className="lg:hidden" onClick={() => logout}>
            <NavText
              title={"Log Out"}
            />
          </div>
        </div>
        <div className={`${!email && "lg:absolute"} flex items-center`}>
          {email && (
            <Stack direction="row" spacing={2} alignItems={"center"}>
              <Link href='/chat'><ChatBubbleOutline color="primary" /></Link>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handlePostAdButton()}
              >
                Post Ad
              </Button>
              <span className="hidden absolute lg:static lg:block text-lg text-gray-500">{email}</span>
              <div className="hidden lg:block" onClick={() => logout()}>
                <NavText
                  title={"Log Out"}
                />
              </div>
            </Stack>
          )}
          <div className="md:hidden md:absolute ml-2" onClick={() => setExpandMenu((prevExpandMenu) => !prevExpandMenu)}>
            {expandMenu ? <CloseIcon /> : <MenuIcon />}
          </div>
        </div>
      </div>
      <Divider />
      {openPostAdModal && <PostAd handleClose={handlePostAdButton} />}
    </>
  );
};

type NavTextProps = {
  title: string,
  isActive?: boolean
}

function NavText({ title, isActive }: NavTextProps) {
  return (
    <span className={`block md:mx-2 lg:mx-1 xl:mx-4 py-3 px-5 md:p-1 lg:p-2 xl:p-4 text-left text-gray-600 cursor-pointer hover:bg-gray-100 md:hover:bg-transparent no-underline ${isActive && "text-green-400 font-bold"}`}>{title}</span>
  )
}
