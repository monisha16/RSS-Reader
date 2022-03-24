import React from 'react';
import styles from './header.module.scss'
import R from '../../assets/icons/r.png';
import S from '../../assets/icons/s.png';
const Header = () => {
    function handleBookmarks(){
        console.log("bookmark");
    }
    function handleAuthentication(){
        console.log("Auth");
    }
    function handleModal(){
        console.log("Modal")
    }
    return (
        <div className={styles.header}>
            {/* <h1> RSS Feed Reader </h1> */}
            <div className={styles.header__image}>
                <img src={R} alt="logo" />
                <img src={S} alt="logo" />
                <img src={S} alt="logo" />
            </div>
            <div className={styles.header__right}>
                <span className={styles.header__right__text}
                onClick={handleModal}> Edit Feed</span>
                <span className={styles.header__right__text}
                onClick={handleBookmarks}> Bookmarks</span>
                <span className={styles.header__right__text}
                onClick={handleAuthentication}> Login/SignUp</span>
            </div>
        </div>
    );
};

export default Header;