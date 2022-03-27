import React, { useState, useEffect,} from 'react';
import styles from './mainpage.module.scss';
import { v4 as uuid } from 'uuid';
import FeedCard from '../FeedCard/FeedCard';
import { useDispatch, useSelector } from 'react-redux';
import { FEED_DATA, FEED_LIST, BOOKMARK_DATA } from '../../store/actionTypes';

const Mainpage = () =>{
  let dispatch = useDispatch();
  const [bookmarkedList, setBookmarkedList] = useState({});
  
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
    const bookmarkInLocalStorage = localStorage.setItem('Bookmarks', JSON.stringify(bookmarkData));
  }, [bookmarkData])


  return(
    <div className={styles.mainpage}>
    {
      Object.keys(feedData).length !==0 ?
          Object.keys(feedData).map((feed)=>{
            {/* console.log("Mainpage ittr",feedData[feed]);
            console.log("feed in Mainpage", feed); */}
            return feedList[feed].view ?  
                    <FeedCard cardData={feedData[feed]} id={feed} key={feed} />
                    :
                    null    //handle Empty View Page msg: Please Select feed items to view     
        })
        :
        <div className={styles.mainpage__nofeed}>
          <h1> Please Add Feeds </h1>
        </div>
    }
    </div>
  )
};

export default Mainpage;
