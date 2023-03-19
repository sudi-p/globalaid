import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import styles from './styles/AuthLayout.module.scss';

export default function AuthLayout() {
  return (
    <>
        <div className={styles.wrapper}>
            <div className={styles.common}>
                <Link to='/'><div className={styles.logo} />
                <div className={styles.title}>GlobalAid</div>
                <div className={styles.subTitle}>Simplifying Student Life</div>
                </Link>
                <div className={styles.image} />
            </div>
            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
        
    </>
  )
}
