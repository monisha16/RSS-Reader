import React from 'react';
import styles from './feedcard.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import bookmarkFeedFalse from '../../assets/images/notBookmarked.svg';
import bookmarkFeedTrue from '../../assets/images/bookmarked.svg';
import { timeSince } from '../../utils';
import { BOOKMARK_DATA } from '../../store/actionTypes';
import { useNavigate } from 'react-router-dom';
import defaultImg from '../../assets/icons/defaultImg.png'

const FeedCard = ({ cardData, id ,type }) => {
    const navigate = useNavigate();
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
        navigate(`/${id}`,{state:{data:item, itemId: id}});
    }
    // { state: { item: item, id: id } }

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
                                    {/* <div className={styles.feed_cards__rightsection__description} 
                                        dangerouslySetInnerHTML={{ __html: cardData[item].description}}
                                    >
                                        {cardData[item].description}
                                    </div> */}
                                    <div className={styles.feed_cards__rightsection__description}>
                                        {cardData[item].author}
                                    </div>

                                    <div className={styles.feed_cards__rightsection__pubDate}> 
                                        {timeSince(cardData[item].pubDate)} ago 
                                    </div>
                                    <div className={styles.feed_cards__rightsection__footer}>
                                        <div onClick={(e)=>handleFeedCardClick(e,cardData[item], item)}>
                                            Read More {">"}
                                            {/* <a href={cardData[item].link} target="_blank" rel="noopener noreferrer"
                                            style={{marginRight:'.5rem'}}>
                                                Read More {">"}
                                                <img src={link} alt="Feed Link" height="15rem" width="15rem" />
                                            </a>  */}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.feed_cards__bookmarkSection}>
                                {
                                            bookmarkData[item] ? 
                                                <img src={bookmarkFeedTrue} alt="Bookmark Feed" 
                                                    height="20px" width="20px" style={{cursor:"pointer"}}
                                                    onClick={(e) => handleBookmarkClick(e, item, false)}
                                                />
                                                :
                                                <img src={bookmarkFeedFalse} alt="Bookmark Feed" 
                                                    height="20px" width="20px" style={{cursor:"pointer"}}
                                                    onClick={(e) => handleBookmarkClick(e, item, true)}
                                                />
                                        }
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