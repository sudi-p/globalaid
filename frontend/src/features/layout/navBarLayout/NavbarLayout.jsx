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
import { Paper, Button, Stack } from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Message
} from "@mui/icons-material";

const NavBar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expandMenu, setExpandMenu] = useState(false);
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
        <NavLink to='/chat'><Message/></NavLink>
        {isLoggedIn ? (
          <Stack direction="row" spacing={2} >
            <Button
              variant="contained"
              sx={{ textTransform: "None", fontWeight: "bold" }}
              size="small"
            >
              Post Ad
            </Button>
            <span className={styles.extraMenuArrow}>
				{email}
				{expandMenu ? (
					<>
					<ExpandLessIcon
						onClick={() => setExpandMenu(false)}
						color="primary"
					/>
						<Paper variant="outlined" className={styles.extraNav}>
							My Account
							<div onClick={() => logout()}>Log Out</div>
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
