import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './notfound.module.scss'; 

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.content__text}>{"Oops, This page doesn't exists."}</div>
                <button onClick={() => navigate('/')} > Go to My Feeds </button>
            </div>
        </div>
    );
};

export default NotFound;