import React,{useState} from 'react';
import styles from './header.module.scss'
import R from '../../assets/icons/r.png';
import S from '../../assets/icons/s.png';
import FeedItems from '../FeedItems/FeedItems';
import SampleFeedItems from '../FeedItems/SampleFeedItems';
import FeedItemsWithFeedData from '../FeedItems/FeedItemsWithFeedData';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const navigate = useNavigate();
    const [modal, setModal] = useState(false)
    function handleBookmarks(){
        // console.log("bookmark");
        navigate('/bookmarks');
    }
    function handleAuthentication(){
        console.log("Auth");
    }
    function handleModal(){
        setModal(!modal)
    }
    return (
        <>
        <div className={styles.header}>
            {/* <h1> RSS Feed Reader </h1> */}
            <div className={styles.header__image}>
                <img src={R} alt="logo" />
                <img src={S} alt="logo" />
                <img src={S} alt="logo" />
            </div>
            <div className={styles.header__right}>
                <span className={styles.header__right__text}
                onClick={handleModal}> Feeds </span>
                <span className={styles.header__right__text}
                onClick={handleBookmarks}> Bookmarks</span>
                {/* <span className={styles.header__right__text}
                onClick={handleAuthentication}> Login/SignUp</span> */}
            </div>
        </div>
            {
               // modal && <SampleFeedItems toggle={setModal} />
                modal && <FeedItemsWithFeedData toggle={setModal} />
            }
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