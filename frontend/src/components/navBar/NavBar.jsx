import { NavLink } from 'react-router-dom';
import styles from './styles/NavBar.module.scss';
const NavBar = (props) => {
	return(
		<div className={styles.navBarContainer}>
            
            <div className={styles.navBarLeft}>
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
            <div className={styles.navBarLeft}>
                Sudip Paudel
                
            </div>
            
        </div>
	)
}

export default NavBar;
