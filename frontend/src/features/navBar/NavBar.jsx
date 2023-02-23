import getClient from '../../lib/api'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchUserStart, fetchUserSuccess, fetchUserError } from './LoggedInUserSlice';
import styles from './styles/NavBar.module.scss';

const NavBar = (props) => {
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(fetchUserStart())
        getClient()
        .get('/user/getuser/')
        .then(res => {
            dispatch(fetchUserSuccess(res.data))
        })
        .catch(err => {
            console.log(err)
            dispatch(fetchUserError())
        })
    }, [])
    const loggedInUser = useSelector(state => state.loggedInUser)
    const { isLoggedIn, email} = loggedInUser;
	return(
		<div className={styles.navBarContainer}>
            <div className={styles.navBarLinks}>
                <NavLink
                    className={({isActive}) => `${styles.link} ${isActive && styles.activeLink}`}
                    to='/'
                >Home</NavLink>
                <NavLink
                    className={({isActive}) => `${styles.link} ${isActive && styles.activeLink}`}
                    to='/jobs'
                >Jobs</NavLink>
                <NavLink
                    className={({isActive}) => `${styles.link} ${isActive && styles.activeLink}`}
                    to='/rentals'
                >Rentals</NavLink>
            </div>
            <div className={styles.navBarLogo}/>
            <div className={styles.navBarLinks}>
                {isLoggedIn ? email: (
                    <>
                        <NavLink
                            className={({isActive}) => `${styles.link} ${isActive && styles.activeLink}`}
                            to="/login/">Login</NavLink>
                        <NavLink
                            className={({isActive}) => `${styles.link} ${isActive && styles.activeLink}`}
                            to="/signup">Sign Up</NavLink>
                    </>
                )}
            </div>
        </div>
	)
}

export default NavBar;
