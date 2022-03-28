import React,{useState} from 'react';
import styles from './emptyfeeds.module.scss';
// import FeedItemsWithFeedData from '../FeedItems/FeedItemsWithFeedData';
import FeedItems from '../FeedItems/FeedItems';
import { useNavigate } from 'react-router-dom';

const EmptyFeeds = ({type}) => {
    const navigate = useNavigate();
    const [modal, setModal] = useState(false)
    function openModal(){
        setModal(!modal)
    }

    // function handleEmptyBookmars(){
    //     na
    // }
    return (
        <>
            { type === 'myFeeds' ?
                <div className={styles.container}>
                    <h1>My Feed</h1>
                    <div className={styles.content}>
                        <div className={styles.content__text}>{"You currently don't have any feeds added."}</div>
                        <button onClick={openModal}> + Add New Feed </button>
                    </div>
                </div>
            :
                <div className={styles.container}>
                    <h1>Bookmarks</h1>
                    <div className={styles.content}>
                        <div className={styles.content__text}>{"You currently don't have any bookmarks"}</div>
                        <button onClick={()=>navigate('/')} > Go to My Feeds </button>
                    </div>
                </div>
            }
            {modal && <FeedItems toggle={setModal} />} 
        </>
        
    );
};

export default EmptyFeeds;