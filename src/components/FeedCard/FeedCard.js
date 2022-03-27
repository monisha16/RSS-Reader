import React,{useState, useEffect} from 'react';
import styles from './feedcard.module.scss';
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import link from '../../assets/icons/link.png';
import bookmarkFeedFalse from '../../assets/icons/bookmark.png';
import bookmarkFeedTrue from '../../assets/icons/bookmarked.png';
import { timeSince } from '../../utils';
import { BOOKMARK_DATA } from '../../store/actionTypes';
import { useNavigate } from 'react-router-dom';
import defaultImg from '../../assets/icons/defaultImg.png'

const FeedCard = ({ cardData, id ,type }) => {
    const navigate = useNavigate();
    const [ bookmarkToggle, setBookmarkToggle] = useState(false);
    const dispatch = useDispatch();
    const { feedList, bookmarkData } = useSelector((state) => {
        const states = {
            feedList: state.feedReducer.feedList,
            bookmarkData: state.feedReducer.bookmarkData
        }
        return states;
    });

    function handleBookmarkClick(e, id, state){
        let newBookmark
        if(state){
            newBookmark = { ...bookmarkData, [id]:cardData[id] }
        }
        else{
            newBookmark = {...bookmarkData}
            delete newBookmark[id];
        }

        dispatch({
            type: BOOKMARK_DATA,
            payload: newBookmark
        });
    }

    function handleFeedCardClick(e,item, id){
        // localStorage.setItem('feedViewData', JSON.stringify(item));
        navigate(`/${id}`,{state:item});
    }

    return (
        <div className={styles.feed_section}>

            {type !=='bookmark'? 
                <div className={styles.feed_section__title}>
                    {feedList[id].name}
                </div> :
                null
            }
            <div className={styles.feed_section__card_container}>
                {
                    Object.keys(cardData).map((item) => {
                        return (
                            <div className={styles.feed_cards}
                            key={item}
                            onClick={(e)=>handleFeedCardClick(e,cardData[item], item)}
                            > 
                                <div className={styles.feed_cards__leftsection}>
                                    {cardData[item].thumbnail.length ===0 ?
                                        <img src={defaultImg} alt="feed Thumbnail" /> :
                                        <img src={cardData[item].thumbnail} alt="feed Thumbnail" />
                                    }
                                </div>
                                <div className={styles.feed_cards__rightsection}>
                                    <div className={styles.feed_cards__rightsection__title} > 
                                        {cardData[item].title} 
                                    </div>
                                    <div className={styles.feed_cards__rightsection__description} 
                                        // dangerouslySetInnerHTML={{ __html: cardData[item].description}}
                                    >
                                        {cardData[item].description}
                                    </div>
                                    <div className={styles.feed_cards__rightsection__pubDate}> 
                                        {timeSince(cardData[item].pubDate)} ago 
                                    </div>
                                    <div className={styles.feed_cards__rightsection__footer}>
                                        <a href={cardData[item].link} target="_blank" rel="noopener noreferrer"
                                         style={{marginRight:'.5rem'}}>
                                            <img src={link} alt="Feed Link" height="15rem" width="15rem" />
                                        </a> 
                                        {
                                            bookmarkData[item] ? 
                                                <img src={bookmarkFeedTrue} alt="Bookmark Feed" 
                                                    height="15rem" width="15rem" 
                                                    onClick={(e) => handleBookmarkClick(e, item, false)}
                                                />
                                                :
                                                <img src={bookmarkFeedFalse} alt="Bookmark Feed" 
                                                    height="15rem" width="15rem" 
                                                    onClick={(e) => handleBookmarkClick(e, item, true)}
                                                />
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })

                }
            </div>   
        </div>
    );
};

export default FeedCard;