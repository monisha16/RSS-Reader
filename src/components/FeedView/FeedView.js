import React from 'react';
import { useLocation } from "react-router-dom";
import { timeSince } from '../../utils';
import styles from './feedview.module.scss';
// import backArrow from '../../assets/images/backArrow.png';
// import defaultImg from '../../assets/images/defaultImg.png';
import linkIcon from '../../assets/images/link.png';
import twitter from '../../assets/images/twitter.png';
import facebook from '../../assets/images/facebook.png';
import linkedIn from '../../assets/images/linkedin.png';
import { useNavigate } from 'react-router-dom';

const FeedView = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    return (
        <>
            <div className={styles.feedView}>
                <div className={styles.backArrow} onClick={()=>navigate('/')}>
                    {/* <span>
                        <img src={backArrow} alt="back-arrow"/> Go back to Feed
                    </span> */}
                </div>

                    <div className={styles.feed_content}>
                        <div className={styles.feed_content__header}>
                            <div className={styles.feed_content__header__publish}>
                                <div>
                                    {state['data']['author']}
                                </div>
                                <div className={styles.feed_content__header__publish__date}>
                                    {timeSince(state['data']['pubDate'])} ago
                                </div>
                            </div>
                            <div className={styles.feed_content__header__sharing}>
                                <a href={`https://twitter.com/intent/tweet?url=${state['data']['guid']}`} 
                                target="_blank" rel="noopener noreferrer">
                                    <img src={twitter} alt="twitter-icon" title="share on twitter"/>
                                </a>
                                <a href={`https://www.facebook.com/sharer.php?u=${state['data']['guid']}`} 
                                target="_blank" rel="noopener noreferrer">
                                    <img src={facebook} alt="facebook-icon" title="share on facebook" />
                                </a>
                                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${state['data']['guid']}`} target="_blank" rel="noopener noreferrer">
                                    <img src={linkedIn} alt="linkedIn-icon" title="share on linkedIn" />
                                </a>
                                <a href={state['data']['guid']} target="_blank" rel="noopener noreferrer">
                                    <img src={linkIcon} alt="link" title="open feed"/>
                                </a>
                            </div>
                        </div>
                        <h1 className={styles.feed_content__title}>
                            {state['data']['title']}
                        </h1>
                        {/* <div className={styles.feed_content__description}
                            dangerouslySetInnerHTML={{ __html:  state['description'] }}
                        /> */}
                        <div className={styles.feed_content__content}
                            dangerouslySetInnerHTML={{ __html: state['data']['content'] }}>
                            
                        </div>
                    </div>
            </div>
        </>
    );
};

export default FeedView;