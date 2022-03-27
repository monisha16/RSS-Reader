import React,{useEffect,useState} from 'react';
import { useParams, useLocation } from "react-router-dom";
import { timeSince } from '../../utils';
import styles from './feedview.module.scss';
import Header from '../Header/Header';
import backArrow from '../../assets/images/backArrow.png';
import defaultImg from '../../assets/images/defaultImg.png';
import { useNavigate } from 'react-router-dom';

const FeedView = () => {
    const navigate = useNavigate();
    // const { feed } = useParams();
    const {state} = useLocation();
    //passing the item from feedData
    useEffect(()=>{
        console.log("State: ", state)
    },[])

    return (
        <>
            {/* <Header /> */}
            <div className={styles.feedView}>

                <div className={styles.backArrow} onClick={()=>navigate('/')}>
                    <img src={backArrow} alt="back-arrow"/> Go back to Feed
                </div>
            
                <div className={styles.container}>
                    <div className={styles.feed_content}>
                        {/* <div className={styles.feed_content__thumbnail}>
                            {state['thumbnail'].length === 0 ?
                                <img src={defaultImg} alt="feed Thumbnail" /> :
                                <img src={state['thumbnail']} alt="feed Thumbnail" />
                            }
                        </div> */}
                        <div className={styles.feed_content__publish}>
                            <div>
                                {state['author']}
                            </div>
                            <div>
                                {timeSince(state['pubDate'])} ago
                            </div>
                        </div>
                        <div className={styles.feed_content__title}>
                            {state['title']}
                        </div>
                        <div className={styles.feed_content__description}
                            dangerouslySetInnerHTML={{ __html:  state['description'] }}
                        >
                            
                        </div>
                        <div className={styles.feed_content__content}
                            dangerouslySetInnerHTML={{ __html: state['content'] }}>
                            
                        </div>
                    </div>
                </div>
            </div>
</>
    );
};

export default FeedView;