import React from 'react';
import styles from './styles/ActiveJob.module.scss';

const ActiveJob = (props) => {
    console.log(props)
    const {description, title, company, location, email, phone } = props;
    return(
      <div className={styles.activeJob}>
        {title}
        {company}
        {description}
        {location}
        {email}
        {phone}
        <div className={styles.roles}>
          <strong>Role & Responsibilities:</strong> {description}
        </div>
      </div>
    );
  }

export default ActiveJob;