import React, { useState, useEffect } from 'react';
import styles from './feedItems.module.scss';
import { v4 as uuid } from 'uuid';
import axios from "axios";
import deleteImg from '../../assets/images/delete.png';
import toggleOn from '../../assets/images/toggleOn.png';
import toggleOff from '../../assets/images/toggleOff.png';
import { useDispatch, useSelector } from 'react-redux';
import { update_feedList, update_feedData } from '../../store/actions/feedAction';
import { FEED_DATA, FEED_LIST } from '../../store/actionTypes';



const FeedItemsCard = ({ feed, id, toggleSetFeed }) => {
    const dispatch = useDispatch();
    // 1. Decide what feeds get viewed through checkboxes | toggle view
    // 2. Delete a feed on click of delete
    // 3. Edit the name of the feed
    // 4. fix SCROLLING
    const { feedList, feedData, bookmarkData } = useSelector((state) => {
        const states = {
            feedList: state.feedReducer.feedList,
            feedData: state.feedReducer.feedData,
            bookmarkData: state.feedReducer.bookmarkData
        }
        return states;
    });
    function deleteFeed(e, id) {
        let newFeedList1 = { ...feedData}
        delete newFeedList1[id];

        let newFeedList2 = { ...feedList }
        delete newFeedList2[id];
        dispatch({
            type: FEED_DATA,
            payload: newFeedList1
        });
        dispatch({
            type: FEED_LIST,
            payload: newFeedList2
        });
        // let newFeedList = Object.keys(feed)
            // .filter((key) => key !== id)
            // .reduce((obj, key) => {
            //     // console.log("dele OBJ, KEY: ", obj, key)
            //     obj[key] = feed[key];
            //     return obj;
            // }, {});
        // sessionStorage.setItem('FeedList', JSON.stringify(newFeedList));
        // toggleSetFeed(newFeedList2);
    }

    function handleSelect(e, id) {
        let newObj = {
            ...feed[id],
            view: !feed[id].view
        }
        let newFeed = { ...feed, [id]: newObj };

        // sessionStorage.setItem('FeedList', JSON.stringify(newFeed));
        // toggleSetFeed(newFeed);
        dispatch({
            type: FEED_LIST,
            payload: newFeed
        });
    }
    return (
        <div className={styles.items_container}
            // style={{ background: feed[id].view ? 'green' : 'red' }}
        >
            <div className={styles.items_container__feedName}>{feed[id].name}</div>
            <div className={styles.items_container__feedURL}>{feed[id].url}</div>
            <div className={styles.items_container__icons}>
                <div onClick={(e) => handleSelect(e, id)}>
                    {feed[id].view ?
                        <img className={styles.items_container__toggleView} src={toggleOn} alt="view state" /> :
                        <img className={styles.items_container__toggleView} src={toggleOff} alt="view state" />
                    }
                </div>
                <img className={styles.items_container__delete} src={deleteImg} 
                alt={"delete-feed"} onClick={(e) => deleteFeed(e, id)} />
            </div>
            
        </div>
    );
}

const FormSection = () => {
    const apiKey = "s5mybzzw2gktjneccuxfnbs9yikyzd6eohm7d70k";
    const [feedName, setFeedName] = useState(""); // name Input
    const [feedURL, setFeedURL] = useState(""); // URL Input

    const dispatch = useDispatch();
    const { feedList, feedData, bookmarkData } = useSelector((state) => {
        const states = {
            feedList: state.feedReducer.feedList,
            feedData: state.feedReducer.feedData,
            bookmarkData: state.feedReducer.bookmarkData
        }
        return states;
    });

    // useEffect(() => {
    //     sessionStorage.setItem('FeedList', JSON.stringify(feedList));
    // }, [feedList]);

    const getFeeds = async (feedItem) => {
        const { data } = await axios.get(feedItem.url);
        console.log(data);
        let tempFeedItems = {};
        
        data['items'].forEach(
            (content) => {
                tempFeedItems = { ...tempFeedItems, [uuid()]: content }; 
            });
        return tempFeedItems;

    };

    useEffect(() => {
        // Array of { id: mainFeedId, url: feed's URL(RSS -> JSON)}
        const urlList = Object.keys(feedList).map(id => {
            return {
                id: id,
                name: feedList[id].name,
                url: `https://api.rss2json.com/v1/api.json?rss_url=${feedList[id].url}&api_key=${apiKey}&count=5`
            }
        });

        urlList.length !==0 && urlList.forEach(async(feedItem) => {
            let newData = await getFeeds(feedItem);
            let tempFeedData = { ...feedData, [feedItem.id]: newData }
            dispatch({
            type: FEED_DATA,
            payload: tempFeedData
        });
            // setCompleteFeed((data) => { return { ...data, [feedItem.id]: newData } });
        });
    }, [feedList]);

    // useEffect(()=>{
    //     debugger;
    //     sessionStorage.setItem('FeedData', JSON.stringify(feedData));
    // },[feedData])

    function handleFeedName(e) {
        setFeedName(e.target.value);
    }
    function handleFeedURL(e) {
        setFeedURL(e.target.value.trim());
    }

    function handleSubmit(e) {
        let tempFeedList = { ...feedList, [uuid()]: { name: feedName, url: feedURL, view: true } };
        dispatch({
            type: FEED_LIST,
            payload: tempFeedList
        });
        setFeedURL("")
        setFeedName("");
        e.preventDefault();
    }

    return (
        <>
            <form className={styles.formSection} onSubmit={handleSubmit}>
                <input
                    id="feedName"
                    placeholder="Feed Name"
                    value={feedName}
                    onChange={handleFeedName}
                    minLength="2"
                    maxLength="25"
                    required
                    autoComplete='off'
                    style={{ width: '12rem' }}
                    title="custom name for feed URL"
                />
                <input
                    id="feedURL"
                    placeholder="Feed URL"
                    value={feedURL}
                    onChange={handleFeedURL}
                    minLength="10"
                    maxLength="100"
                    required
                    autoComplete='off'
                    style={{ width: '20rem' }}
                />
                <button type="Submit"> + </button>
            </form>
            <div className={styles.feedTable}>
                <div className={styles.feedTable__name}>Feed Name</div>
                <div className={styles.feedTable__feedURL}>URL</div>
                {/* <div className={styles.feedTable__icons}>Status</div> */}
            </div>
            
            <div className={styles.feedList}>
                {Object.keys(feedList).length === 0 ?
                    <h2 style={{color:'rgba(0,0,0,0.3)'}}> No Feeds </h2>
                    :
                    <>
                    {Object.keys(feedList).map((id) => {
                        return <FeedItemsCard key={id} feed={feedList} id={id} />
                    })}

                    </>                    
                } 
            </div>
        </>
    );
}

const FeedItemsWithFeedData = ({ toggle }) => {

    function handleClose() {
        toggle((modal) => !modal);
    }
    return (
        <div className={styles.container}>
            <div className={styles.container__modal}>
                <div className={styles.header}>
                    <div className={styles.header__text}> Manage Feeds </div>
                    <button className={styles.header__close} onClick={handleClose}> close </button>
                </div>
                <FormSection />
            </div>
        </div>
    );
};

export default FeedItemsWithFeedData;