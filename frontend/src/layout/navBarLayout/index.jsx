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
import { Paper, Button, Stack, Divider, ClickAwayListener } from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  ChatBubbleOutline
} from "@mui/icons-material";
import PostAd from '@features/postAdModal/PostAd';
import Footer from './Footer';
import styles from "./styles/NavBar.module.scss";

function NavBar(props) {
  const [expandMenu, setExpandMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const { isLoggedIn, email } = loggedInUser;
  const handlePostAdButton = () => {
    setOpen((prevOpen) => !prevOpen);
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
  return (
    <>
      <div className={`px-4 h-16 relative flex justify-between items-center font-semibold`}>
        <div className={`hidden md:flex ${styles.navBarLinks}`}>
          {navLinks.map((navLink) => (
            <LinkBox
              key={navLink.name}
              isActive={router.route === navLink.link}
              title={navLink.name}
              link={navLink.link}
            />
          ))}
        </div>
        <div style={{ backgroundImage: "url('https://res.cloudinary.com/dtqxwjmwn/image/upload/v1674412883/GlobalAid/GlobalAid_Logo.png')" }} className={`w-14 h-14 bg-cover bg-no-repeat bg-center ${styles.navBarLogo} `} />
        <div className={`${styles.navBarLinks}`}>
          {isLoggedIn ? (
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
              {open && <PostAd handleClose={handlePostAdButton} />}
              <div>{email}</div>
              <span className={styles.extraMenuArrow}>
                {expandMenu ? (
                  <>
                    <ExpandLessIcon
                      onClick={() => setExpandMenu(false)}
                      color="primary"
                    />
                    <ClickAwayListener
                      onClickAway={() => setExpandMenu(false)}
                    >
                      <Paper
                        onClick={() => setExpandMenu(false)}
                        sx={{ zIndex: 10 }}
                        variant="outlined"
                        className={styles.extraNav}
                      >
                        <Stack justifyContent="flex-start">
                          {extraNavLinks.map(extraNavLink => (
                            <>
                              <LinkBox key={extraNavLink.name} title={extraNavLink.name} link={extraNavLink.link} isActive={router.route === extraNavLink.link} />
                              <Divider />
                            </>
                          ))}
                          <div className="mr-4 p-4 text-left text-gray-600 cursor-pointer hover:text-green-600" onClick={() => logout()}>Log Out</div>
                        </Stack>
                      </Paper>
                    </ClickAwayListener>

                  </>
                ) : (
                  <ExpandMoreIcon
                    onClick={() => setExpandMenu(true)}
                    color="primary"
                  />
                )}
              </span>
            </Stack>
          ) : (
            <>
              {authLinks.map((navLink) => (
                <LinkBox key={navLink.name} title={navLink.name} link={navLink.link} />
              ))}
            </>
          )}
        </div>
      </div>
      <Divider />
    </>
  );
};

function LinkBox({ title, link, isActive }) {
  return (
    <Link
      href={link}
    >
      <a className={`mr-4 p-4 text-left text-gray-600 cursor-pointer hover:text-green-600 no-underline  ${isActive && "text-green-400 font-bold"}`}>{title}</a>
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
