import React,{useState} from 'react';
import styles from './header.module.scss'
import myRSSFeederLogo from '../../assets/images/myRSSFeederLogo.png';
import FeedItemsWithFeedData from '../FeedItems/FeedItemsWithFeedData';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const navigate = useNavigate();
    const [modal, setModal] = useState(false)
    const [toggleBookmark, settoggleBookmark] = useState(false);
    const [toggleMyFeed, settoggleMyFeed] = useState(true);
    const [toggleColor, setToggleColor] = useState(true);

    function handleBookmarks(){
        // settoggleBookmark((value)=>!value);
        // settoggleMyFeed((value)=>!value);
        setToggleColor(!toggleColor);
        navigate('/bookmarks');
    }
    function handleModal(){
        // setToggleBookmark((value) => !value);
        // setToggleMyFeed((value) => !value);
        setToggleColor(!toggleColor);
        // setModal(!modal)
        navigate('/');
    }
    return (
        <>
        <div className={styles.header}>
            <div className={styles.header__image}>
                <img src={myRSSFeederLogo} alt="logo" />
            </div>
            <div className={styles.header__right}>

                <div className={styles.header__right__text}
                    onClick={handleBookmarks}
                        style={{ color: toggleColor ? 'var(--primary)' : 'var(--orange)' }}
                    > Bookmarks</div>

                <div className={styles.header__right__text}
                    onClick={handleModal}
                        style={{ color: toggleColor? 'var(--orange)': 'var(--primary)'}}
                    > My Feeds </div>
                
                {/* <span className={styles.header__right__text}
                onClick={handleAuthentication}> Login/SignUp</span> */}
            </div>
        </div>
            {/* modal && <FeedItemsWithFeedData toggle={setModal} /> */} 
        </>
    );
};

export default Header;


/**
 Sample Data for Complete Feed Data

    {
        mainFeedId1:
        {
            name: feedName,
            items:{
                uniqueItem1:{
                    item content: ...
                },
                uniqueItem2:{
                    item content: ...
                },
                
            }
        },
        mainFeedId2:
        {
            name: feedName,
            items:{
                uniqueItem1:{
                    item content: ...
                },
                uniqueItem2:{
                    item content: ...
                },
                
            }
        }
    }





 */