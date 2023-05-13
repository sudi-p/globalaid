import React from "react";
import { NavLink } from 'react-router-dom';
import styles from "./styles/PageNotFound.module.scss";

const PageNotFound = props => {
  return (
    <div className={styles.errors}>
      <div className={styles.text_wrapper}>
        <span className={styles.title}>Page Not Available</span>
        <div className={styles.image} />

        <p>Sorry, this page isn't available</p>

        <p>
          The link you followed may be broken , or the page may have been
          removed or you may be logged out from our system.
        </p>
        <p>
          Go back to <NavLink to="/"><strong>Home</strong></NavLink> page.
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;