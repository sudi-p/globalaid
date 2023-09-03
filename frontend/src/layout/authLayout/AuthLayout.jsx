import React, { Suspense } from 'react';
import Link from 'next/link';
import styles from './styles/AuthLayout.module.scss';

export default function AuthLayout({ children }) {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.common}>
          <div className={styles.link}>
            <Link href='/'>
              <a>
                <div className={styles.logo} />
                <div className={styles.title}>GlobalAid</div>
                <div className={styles.subTitle}>Simplifying Student Life</div>
              </a>
            </Link>
          </div>
          <div className={styles.image} />
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <Suspense fallback="loading">
              {children}
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
}
