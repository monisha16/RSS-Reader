import React,{useEffect,useState} from 'react';
import { useParams, useLocation } from "react-router-dom";
import { timeSince } from '../../utils';
import styles from './feedview.module.scss';
import Header from '../Header/Header';
const FeedView = () => {
    // const { feed } = useParams();
    const {state} = useLocation();
    //passing the item from feedData
    useEffect(()=>{
        console.log("State: ", state)
    },[])

    return (
        <>
            <Header />
            <div className={styles.container}>
                <a>
                    <img />
                </a>
                <div className={styles.feed_content}>
                    {
                        state['thumbnail'].length === 0 ? null :
                            <img />
                    }
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
                    <div className={styles.feed_content__description}>
                        {state['description']}
                    </div>
                    <div className={styles.feed_content__content}>
                        {state['content']}
                    </div>
                </div>
            </div>
</>
    );
};

export default FeedView;