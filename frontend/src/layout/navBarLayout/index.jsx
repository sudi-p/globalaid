import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from "react-redux";
import getClient from "../../lib/api";
import {
  fetchUserStart,
  fetchUserSuccess,
  clearLoggedInUser,
} from "../../store/slices/LoggedInUserSlice";
import { Paper, Button, Stack, Divider } from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  ChatBubbleOutline
} from "@mui/icons-material";
import PostAd from '@features/postAdModal/PostAd';
import Footer from './Footer';

function NavBar(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [expandMenu, setExpandMenu] = useState(false);
  const [openPostAdModal, setOpenPostAdModal] = useState(false);
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const { isLoggedIn, email } = loggedInUser;
  const handlePostAdButton = () => {
    setOpenPostAdModal((prevOpenPostAdModal) => !prevOpenPostAdModal);
  };
  useEffect(() => {
    dispatch(fetchUserStart());
    getClient()
      .get("/user/getuser/")
      .then((res) => {
        dispatch(fetchUserSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(clearLoggedInUser());
      });
  }, []);
  const logout = async () => {
    document.cookie =
      "token= 0k;expires=Thu, 01 Aug 2018 00:00:00 UTC; path=/;";
    dispatch(clearLoggedInUser());
    await router.push("/");
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
      link: "/my-ads"
    },
    {
      name: "My Ads",
      link: "/my-ads"
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
  isLoggedIn ? navLinks.push(...extraNavLinks) : navLinks.push(...authLinks)
  return (
    <>
      <div className={`px-4 h-16 relative flex justify-between items-center font-semibold max-w-screen-xl m-auto w-11/12`}>
        <span className={"flex text-lg mr-2 tracking-wide"}>
          global<span className="font-extrabold">Aid</span>
        </span>
        <div className={`${expandMenu ? 'top-16 ' : 'top-[-490px]'} absolute block -left-6 -right-6 z-10 border border-solid border-gray-300 lg:border-0 bg-white lg:bg-transparent lg:static lg:flex items-center transition-all duration-500 ease-in`}>
          {navLinks.map((navLink) => (
            <LinkBox
              key={navLink.name}
              isActive={router.route === navLink.link}
              title={navLink.name}
              link={navLink.link}
            />
          ))}
          <div className="lg:hidden mx-4 p-4 text-left text-gray-600 cursor-pointer hover:text-green-600" onClick={() => logout()}>Log Out</div>
        </div>
        <div className={`${!isLoggedIn && "lg:absolute"} flex items-center`}>
          {isLoggedIn && (
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
              <span className="text-lg text-gray-500">{email}</span>
              <div className="hidden lg:block pl-4 text-left text-gray-600 cursor-pointer hover:text-green-600" onClick={() => logout()}>Log Out</div>
            </Stack>
          )}
          <div className="lg:hidden ml-1" onClick={() => setExpandMenu((prevExpandMenu) => !prevExpandMenu)}>
            {expandMenu ? <CloseIcon /> : <MenuIcon />}
          </div>
        </div>
      </div>
      <Divider />
      {openPostAdModal && <PostAd handleClose={handlePostAdButton} />}
    </>
  );
};

function LinkBox({ title, link, isActive }) {
  return (
    <Link
      href={link}
    >
      <a className={`block mx-4 p-4 text-left text-gray-600 cursor-pointer hover:text-green-600 no-underline  ${isActive && "text-green-400 font-bold"}`}>{title}</a>
    </Link>
  )
}

export default function NavbarLayout({ children }) {
  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="flex-1 bg-gray-100">
        {children}
      </div>
      <Footer />
    </div>
  );
}
