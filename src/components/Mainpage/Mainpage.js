import React, { useState, useEffect,} from 'react';
import styles from './mainpage.module.scss';
import { v4 as uuid } from 'uuid';
import FeedCard from '../FeedCard/FeedCard';
import { useDispatch, useSelector } from 'react-redux';
import { FEED_DATA, FEED_LIST, BOOKMARK_DATA } from '../../store/actionTypes';
import EmptyFeeds from '../EmptyFeeds/EmptyFeeds';
import slider from "../../assets/images/slider.png";
import FeedItemsWithFeedData from "../FeedItems/FeedItemsWithFeedData"

const Mainpage = () =>{
  let dispatch = useDispatch();
  const [modal, setModal] = useState(false)
    function openModal(){
        setModal(!modal)
    }
  
  useEffect(()=>{
    const feedListInSessionStorage = sessionStorage.getItem('FeedList');
    if (feedListInSessionStorage) {
      dispatch({
        type: FEED_LIST,
        payload: JSON.parse(feedListInSessionStorage)
      })
    }

    const feedItemsInSessionStorage = sessionStorage.getItem('FeedData');
    if (feedItemsInSessionStorage) {
      dispatch({
        type: FEED_DATA,
        payload: JSON.parse(feedItemsInSessionStorage)
      })
    }
    
    const bookmarkInLocalStorage = localStorage.getItem('Bookmarks');
    if (bookmarkInLocalStorage) {
      dispatch({
        type: BOOKMARK_DATA,
        payload: JSON.parse(bookmarkInLocalStorage)
      })
    }
    
  },[]);

  const { feedList, feedData, bookmarkData } = useSelector((state) => {
    const states = {
      feedList: state.feedReducer.feedList,
      feedData: state.feedReducer.feedData,
      bookmarkData: state.feedReducer.bookmarkData
    }
    return states;
  });
  useEffect(() => {
    localStorage.setItem('Bookmarks', JSON.stringify(bookmarkData));
  }, [bookmarkData])

  return(
    <>
      {
        Object.keys(feedData).length !== 0 ?
          <div className={styles.mainpage}>
            <div className={styles.mainHeader}>
              <h1 style={{fontWeight:900, fontSize:"2rem"}}>My Feed</h1>
              <button className={styles.manageFeedBtn} onClick={()=>{openModal()}}>
                <img src={slider} alt="manage-feed" height={20} width={20}/>
                Manage Feed
              </button>
            </div>
            <div className={styles.feedCardContainer}>
            {Object.keys(feedData).map((feed) => {
              return feedList[feed].view ?
                <FeedCard cardData={feedData[feed]} id={feed} key={feed} type="mainData" />
                :
                null    
            })}
            </div>
          </div>
            :
          <div className={styles.emptyfeed} >
            <EmptyFeeds setModal={setModal}  type="myFeeds" />
          </div>
          
        }
        {modal && <FeedItemsWithFeedData toggle={setModal} />} 
    </>
    
  )
};

export default Mainpage;
