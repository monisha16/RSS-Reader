import React from 'react';
import { Navigate } from 'react-router-dom';
import styles from './notfound.module.scss'; 

const NotFound = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.content__text}>{"Oops, This page doesn't exists."}</div>
                <button onClick={() => Navigate('/')} > Go to My Feeds </button>
            </div>
        </div>
    );
};

export default NotFound;