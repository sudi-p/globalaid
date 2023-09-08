import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from "react-redux";
import getClient from "../../lib/api";
import {
  fetchUserStart,
  fetchUserSuccess,
  clearLoggedInUser,
} from "../../store/slices/LoggedInUserSlice";
import { Button, Stack, Divider } from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  ChatBubbleOutline
} from "@mui/icons-material";
import PostAd from '@features/postAdModal/PostAd';
import Footer from './Footer';


function NavBar() {
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
      <div className={`px-2 md:px-10 lg:px-4 h-16 relative flex justify-between items-center font-semibold max-w-screen-xl md:m-auto md:w-11/12`}>
        <span className={"flex text-lg xl:mr-2 tracking-wide"}>
          global<span className="font-extrabold">Aid</span>
        </span>
        <div className={`${expandMenu ? 'top-16 ' : 'top-[-490px]'} absolute block -left-1 -right-6 z-10 border border-solid border-gray-300 md:border-0 bg-white md:bg-transparent md:static md:flex items-center transition-all duration-500 ease-in`}>
          {navLinks.map(({ name, link }) => (
            <Link
              href={link}
            >
              <NavText
                key={name}
                isActive={router.route === link}
                title={name}
              />
            </Link>
          ))}
          <div className="lg:hidden" onClick={() => logout()}>
            <NavText
              title={"Log Out"}
            />
          </div>
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

function NavText({ title, isActive = false }: NavTextProps) {
  return (
    <span className={`block md:mx-2 lg:mx-1 xl:mx-4 py-3 px-5 md:p-1 lg:p-2 xl:p-4 text-left text-gray-600 cursor-pointer hover:bg-gray-100 md:hover:bg-transparent no-underline ${isActive && "text-green-400 font-bold"}`}>{title}</span>
  )
}
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
