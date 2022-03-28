import React,{useEffect, useState} from 'react';
import styles from './header.module.scss'
import myRSSFeederLogo from '../../assets/images/myRSSFeederLogo.png';
import { useNavigate, useLocation } from 'react-router-dom';



const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [toggleColor, setToggleColor] = useState(true);
    useEffect(()=>{
        // console.log("useLocation: ", location.pathname);
        if(location.pathname === '/bookmarks'){
            setToggleColor(false);
        }
        else if (location.pathname === '/'){
            setToggleColor(true);
        }    
    }, [location.pathname])
    
    function handleBookmarks(){
        setToggleColor(!toggleColor);
        navigate('/bookmarks');
    }
    function handleModal(){
        setToggleColor(!toggleColor);
        navigate('/');
    }
    return (
        <>
        <div id="myHeader" className={styles.header}>
            <div className={styles.header__image}>
                <img src={myRSSFeederLogo} alt="logo" />
            </div>
            <div className={styles.header__right}>

                <div className={styles.header__right__text}
                    onClick={handleBookmarks}
                        style={{ color: toggleColor ? 'rgba(0,0,0,0.3)' : 'var(--orange)' }}
                    > Bookmarks</div>

                <div className={styles.header__right__text}
                    onClick={handleModal}
                        style={{ color: toggleColor ? 'var(--orange)' : 'rgba(0,0,0,0.3)'}}
                    > My Feeds </div>
            </div>
        </div>
        </>
    );
};

export default Header;
