import React, { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import getClient from "../../../lib/api";
import {
  fetchUserStart,
  fetchUserSuccess,
  clearLoggedInUser,
} from "./LoggedInUserSlice";
import styles from "./styles/NavBar.module.scss";
import { Paper, Button, Stack, Divider } from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  ChatBubbleOutline
} from "@mui/icons-material";
import PostAd from '../../postAd/PostAd';

const NavBar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expandMenu, setExpandMenu] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
    await navigate("/");
  };
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const { isLoggedIn, email } = loggedInUser;
  return (
    <div className={styles.navBarContainer}>
      <div className={styles.navBarLinks}>
        <NavLink
          className={({ isActive }) =>
            `${styles.link} ${isActive && styles.activeLink}`
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${styles.link} ${isActive && styles.activeLink}`
          }
          to="/jobs"
        >
          Jobs
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${styles.link} ${isActive && styles.activeLink}`
          }
          to="/rentals"
        >
          Rentals
        </NavLink>
      </div>
      <div className={styles.navBarLogo} />
      <div className={styles.navBarLinks}>
        {isLoggedIn ? (
          <Stack direction="row" spacing={2} alignItems={"center"}>
            <NavLink to='/chat'><ChatBubbleOutline color="primary" /></NavLink>
            <Button
              variant="contained"
              sx={{ textTransform: "None", fontWeight: "bold" }}
              size="small"
              onClick={() => handleClickOpen()}
            >
              Post Ad
            </Button>
            {open && <PostAd handleClose={handleClose} />}
            <span className={styles.extraMenuArrow}>
              {email}
              {expandMenu ? (
                <>
                  <ExpandLessIcon
                    onClick={() => setExpandMenu(false)}
                    color="primary"
                  />
                  <Paper sx={{ zIndex: 10}} variant="outlined" elevation={3} className={styles.extraNav}>
                    <Stack justifyContent="flex-start">
                      <NavLink
                        className={({ isActive }) =>
                          `${styles.link} ${isActive && styles.activeLink}`
                        }
                        to="/myads/"
                      >
                        My Account
                      </NavLink>
                      <Divider />
                      <NavLink
                        className={({ isActive }) =>
                          `${styles.link} ${isActive && styles.activeLink}`
                        }
                        to="/myads/"
                      >
                        MyAds
                      </NavLink>
                      <Divider />
                      <div className={styles.link} onClick={() => logout()}>Log Out</div>
                    </Stack>


                  </Paper>

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
            <NavLink
              className={({ isActive }) =>
                `${styles.link} ${isActive && styles.activeLink}`
              }
              to="/login/"
            >
              Login
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `${styles.link} ${isActive && styles.activeLink}`
              }
              to="/signup"
            >
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default function NavbarLayout() {
  return (
    <div className={styles.navbarLayout}>
      <NavBar />
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
}
